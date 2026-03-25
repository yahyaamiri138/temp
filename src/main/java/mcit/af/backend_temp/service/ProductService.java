package mcit.af.backend_temp.service;

import mcit.af.backend_temp.entity.Category;
import mcit.af.backend_temp.entity.Product;
import mcit.af.backend_temp.repository.CategoryRepository;
import mcit.af.backend_temp.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ProductResponse> getAll() {
        return productRepository.findAll().stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product create(Product product, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        product.setCategory(category);
        return productRepository.save(product);
    }

    public Product update(Long id, Product product, Long categoryId) {
        Product existing = getById(id);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        existing.setName(product.getName());
        existing.setType(product.getType());
        existing.setSize(product.getSize());
        existing.setDescription(product.getDescription());
        existing.setCategory(category);

        return productRepository.save(existing);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}