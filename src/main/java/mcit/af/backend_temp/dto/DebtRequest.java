package mcit.af.backend_temp.dto;
import lombok.Getter;
import lombok.Setter;
import mcit.af.backend_temp.enumeration.DebtType;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class DebtRequest {

    private Long partyId;

    private BigDecimal amount;

    private BigDecimal paidAmount;

    private String description;

    private LocalDate dueDate;

    private DebtType type;
}