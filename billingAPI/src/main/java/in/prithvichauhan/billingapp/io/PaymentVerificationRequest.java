package in.prithvichauhan.billingapp.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVerificationRequest {

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private String orderId;

}
