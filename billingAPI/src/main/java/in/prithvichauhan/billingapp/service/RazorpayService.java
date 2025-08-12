package in.prithvichauhan.billingapp.service;

import com.razorpay.RazorpayException;
import in.prithvichauhan.billingapp.io.RazorpayOrderResponse;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;

}
