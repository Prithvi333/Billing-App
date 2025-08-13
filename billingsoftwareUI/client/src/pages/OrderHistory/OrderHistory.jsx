import { useEffect, useState } from "react";
import "./OrderHistory.css";
import { latestOrders } from "../../service/OrderService";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await latestOrders();
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);
  const formatItems = (items) => {
    return items.map((item) => `${item.name}*${item.quantity}`).join(", ");
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  if (loading) {
    return <div className="text-center py-4">Loading orders...</div>;
  }
  if (orders.length == 0) {
    return <div className="text-center py-4">No order found</div>;
  }
  return (
    <div className="order-history-container">
      <h2 className="mb-2 text-light">Total Orders</h2>
      <div className="table-responsive">
        <table className="table tabel-striped tabel-hover">
          <thead className="table-dark">
            <tr>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>
                  {order.customerName}
                  <br />
                  <small className="text-muted">{order.phoneNumber}</small>
                </td>
                <td>{formatItems(order.items)}</td>
                <td>&#8377;{order.grandTotal}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <span
                    className={`badge ${
                      order.paymentDetails.status == "COMPLETE"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {order.paymentDetails?.status || "PENDING"}
                  </span>
                </td>
                <td>{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
