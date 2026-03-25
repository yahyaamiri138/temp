package mcit.af.backend_temp.dto;

import mcit.af.backend_temp.entity.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {

    private String name;
    private String type;
    private String size;
    private String description;
    private Long categoryId;

    public Product toProduct() {
        Product p = new Product();
        p.setName(name);
        p.setType(type);
        p.setSize(size);
        p.setDescription(description);
        return p;
    }
}