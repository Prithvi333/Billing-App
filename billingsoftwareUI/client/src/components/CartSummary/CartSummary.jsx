import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import "./CartSummary.css";
import { createOrder, deleteOrder } from "../../service/OrderService";
import { toast } from "react-toastify";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../service/PaymentService";
import { AppConstants } from "../../utils/constants";
const CartSummary = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  const { cartItems, clearCart } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = totalAmount * 0.01;

  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  };

  const placeOrder = async () => {
    setShowPopup(true);
    clearAll;
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Something went wrong while deleting the order.");
    }
  };

  const completePayment = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Please enter customer name and mobile number.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty. Please add items to the cart.");
      return;
    }
    setIsProcessing(true);
    const orderData = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems,
      subtotal: totalAmount,
      tax,
      grandTotal,
      paymentMode: paymentMode.toUpperCase(),
    };
    try {
      const response = await createOrder(orderData);
      const savedData = response.data;
      if (response.status === 201 && paymentMode === "cash") {
        toast.success("Cash received successfully!");
        setOrderDetails(response.data);
      } else if (response.status === 201 && paymentMode === "upi") {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
          toast.error("Razorpay SDK failed to load. Please try again later.");
          deleteOrderOnFailure(savedData.orderId);
          return;
        }
        const razorpayResponse = await createRazorpayOrder({
          amount: savedData.grandTotal,
          currency: "INR",
        });
        const options = {
          key: AppConstants.RAZORPAY_KEY_ID,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          orderId: razorpayResponse.data.id,
          name: "Retail Store",
          description: "Payment for order",
          handler: async (response) => {
            await verifyPaymentHandler(response, savedData);
          },
          prefill: {
            name: customerName,
            contact: mobileNumber,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: async () => {
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment cancelled");
            },
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", async (response) => {
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment failed. Please try again.");
          console.error(response.error.description);
        });
        razorpay.open();
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };
  const verifyPaymentHandler = async (response, savedOrder) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId,
    };
    try {
      const paymentResponse = await verifyRazorpayPayment(paymentData);
      if (paymentResponse.status === 200) {
        toast.success("Payment verified successfully!");
        setOrderDetails({
          ...savedOrder,
          paymentDetails: {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          },
        });
      } else {
        toast.error("Payment processing failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment verification failed. Please try again.");
    }
  };
  return (
    <div className="mt-2">
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Item</span>
          <span className="text-light">{totalAmount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Tax(1%)</span>
          <spant className="text-light">{tax.toFixed(2)}</spant>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span className="text-light">Total:</span>
          <spant className="text-light">{grandTotal.toFixed(2)}</spant>
        </div>
      </div>
      <div className="d-flex gap-3">
        <button
          className="btn btn-success flex-grow-1"
          onClick={completePayment("cash")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Cash"}
        </button>
        <button
          className="btn btn-primary flex-grow-1"
          onClick={completePayment("upi")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "UPI"}
        </button>
      </div>
      <div className="d-flex gap-3 mt-3">
        <button
          className="btn btn-warning flex-grow-1"
          onClick={placeOrder}
          disabled={isProcessing || !orderDetails}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
