package mcit.af.backend_temp.controller;

import mcit.af.backend_temp.entity.Product;
import mcit.af.backend_temp.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductResponse> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Product create(@RequestBody ProductRequest request) {
        return service.create(request.toProduct(), request.getCategoryId());
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id,
                          @RequestBody ProductRequest request) {
        return service.update(id, request.toProduct(), request.getCategoryId());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}