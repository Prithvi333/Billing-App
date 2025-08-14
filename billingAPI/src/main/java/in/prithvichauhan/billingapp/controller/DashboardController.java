package in.prithvichauhan.billingapp.controller;

import in.prithvichauhan.billingapp.io.DashboardResponse;
import in.prithvichauhan.billingapp.io.OrderResponse;
import in.prithvichauhan.billingapp.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public DashboardResponse getDashBoardDate() {
        LocalDate today = LocalDate.now();
        Double todaySale = orderService.sumSalesByDate(today);
        Long todayOrdersCount = orderService.countByOrderDate(today);
        List<OrderResponse> recentOrders = orderService.findRecentOrders();
        return new DashboardResponse(
                todaySale != null ? todaySale : 0.0,
                todayOrdersCount != null ? todayOrdersCount : 0,
                recentOrders
        );
    }


}
