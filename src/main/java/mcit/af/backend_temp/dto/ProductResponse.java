package mcit.af.backend_temp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponse {

    private Long id;
    private String name;
    private String type;
    private String size;
    private String description;

    private Long categoryId;
    private String categoryName;
}