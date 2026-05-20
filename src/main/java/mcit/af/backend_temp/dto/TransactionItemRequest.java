package mcit.af.backend_temp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionItemRequest {

    private Long productId;
    private Integer quantity;
    private Double price;
}