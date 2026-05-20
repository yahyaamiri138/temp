package mcit.af.backend_temp.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import mcit.af.backend_temp.enumeration.TransactionType;
import mcit.af.backend_temp.enumeration.PaymentType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "transactions")
@Getter
@Setter
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    private Double totalAmount;
 
    @ManyToOne
    private Party party;

    @OneToMany(mappedBy = "transaction", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TransactionItem> items;

   
}