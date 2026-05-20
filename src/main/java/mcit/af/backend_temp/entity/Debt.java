package mcit.af.backend_temp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import mcit.af.backend_temp.enumeration.DebtType;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "debts")
@Getter
@Setter
public class Debt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal amount;

    private BigDecimal paidAmount;

    private BigDecimal remainingAmount;

    private String description;

    private LocalDate dueDate;

    private Boolean paid = false;

    @Enumerated(EnumType.STRING)
    private DebtType type;

    @ManyToOne
    private Party party;
}