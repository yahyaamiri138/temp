package mcit.af.backend_temp.entity;
  
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String size;

    @Column(nullable = false)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY) // Lazy loading for better performance
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}