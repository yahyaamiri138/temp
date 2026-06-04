package mcit.af.backend_temp.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TransactionItemResponse {

    private Long id;

    private Long productId;

    private String productName;

    private Integer quantity;

    private Double price;

    private Long transactionId;

    private String partyName;

    private String transactionType;

    private String paymentType;
}