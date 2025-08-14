package in.prithvichauhan.billingapp.service;

import in.prithvichauhan.billingapp.io.OrderRequest;
import in.prithvichauhan.billingapp.io.OrderResponse;
import in.prithvichauhan.billingapp.io.PaymentVerificationRequest;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayment(PaymentVerificationRequest request);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders();
}

