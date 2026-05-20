package mcit.af.backend_temp.dto;
import lombok.Getter;
import lombok.Setter;
import mcit.af.backend_temp.enumeration.PaymentType;
import mcit.af.backend_temp.enumeration.TransactionType;
import java.util.List;

@Getter
@Setter
public class TransactionRequest {
    
    private Long partyId;
    private TransactionType type;
    private PaymentType paymentType;
    private List<TransactionItemRequest> items;
}