package mcit.af.backend_temp.entity;

import mcit.af.backend_temp.enumeration.LocationType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "inventory")
@Getter
@Setter
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    @Enumerated(EnumType.STRING)
    private LocationType location;

    @ManyToOne
    private Product product;
}