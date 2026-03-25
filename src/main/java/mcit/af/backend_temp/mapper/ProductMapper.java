package mcit.af.backend_temp.mapper;

import mcit.af.backend_temp.dto.ProductResponse;
import mcit.af.backend_temp.entity.Product;

public class ProductMapper {

    public static ProductResponse toDto(Product product) {
        ProductResponse dto = new ProductResponse();

        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setType(product.getType());
        dto.setSize(product.getSize());
        dto.setDescription(product.getDescription());

        dto.setCategoryId(product.getCategory().getId());
        dto.setCategoryName(product.getCategory().getName());

        return dto;
    }
}