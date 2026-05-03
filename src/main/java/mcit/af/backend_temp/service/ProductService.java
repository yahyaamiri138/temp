package mcit.af.backend_temp.service;

import mcit.af.backend_temp.dto.ProductRequest;
import mcit.af.backend_temp.dto.ProductResponse;
import mcit.af.backend_temp.entity.Category;
import mcit.af.backend_temp.entity.Product;
import mcit.af.backend_temp.exception.GlobalExceptionHandler;
import mcit.af.backend_temp.exception.NotFoundException;
import mcit.af.backend_temp.repository.CategoryRepository;
import mcit.af.backend_temp.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    // ================= GET ALL =================
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ================= CREATE =================
    public ProductResponse createProduct(ProductRequest request) {
        Product product = request.toProduct();

        Category category = getCategory(request.getCategoryId());
        product.setCategory(category);

        Product saved = productRepository.save(product);
        return convertToResponse(saved);
    }

    // ================= UPDATE =================
    public ProductResponse updateProduct(Long id, ProductRequest request) {

        Product existing = productRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("Product not found with id: " + id));

        existing.setName(request.getName());
        existing.setType(request.getType());
        existing.setSize(request.getSize());
        existing.setDescription(request.getDescription());

        Category category = getCategory(request.getCategoryId());
        existing.setCategory(category);

        Product updated = productRepository.save(existing);
        return convertToResponse(updated);
    }

    // ================= DELETE =================
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new NotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    // ================= HELPER =================
    private Category getCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("Category not found with id: " + id));
    }

    // ================= MAPPER =================
    private ProductResponse convertToResponse(Product product) {

        ProductResponse response = new ProductResponse();

        response.setId(product.getId());
        response.setName(product.getName());
        response.setType(product.getType());
        response.setSize(product.getSize());
        response.setDescription(product.getDescription());

        if (product.getCategory() != null) {
            response.setCategoryId(product.getCategory().getId());
            response.setCategoryName(product.getCategory().getName());
        }

        return response;
    }
}