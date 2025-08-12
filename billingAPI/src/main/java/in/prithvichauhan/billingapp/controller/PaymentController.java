package in.prithvichauhan.billingapp.controller;

import com.razorpay.RazorpayException;
import in.prithvichauhan.billingapp.io.OrderResponse;
import in.prithvichauhan.billingapp.io.PaymentRequest;
import in.prithvichauhan.billingapp.io.PaymentVerificationRequest;
import in.prithvichauhan.billingapp.io.RazorpayOrderResponse;
import in.prithvichauhan.billingapp.service.OrderService;
import in.prithvichauhan.billingapp.service.RazorpayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
       return orderService.verifyPayment(request);
    }


}
