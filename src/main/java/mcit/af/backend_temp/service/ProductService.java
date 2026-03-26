// package mcit.af.backend_temp.service;

// import mcit.af.backend_temp.entity.Category;
// import mcit.af.backend_temp.entity.Product;
// import mcit.af.backend_temp.repository.CategoryRepository;
// import mcit.af.backend_temp.repository.ProductRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class ProductService {

//     private final ProductRepository productRepository;
//     private final CategoryRepository categoryRepository;

//     public ProductService(ProductRepository productRepository,
//                           CategoryRepository categoryRepository) {
//         this.productRepository = productRepository;
//         this.categoryRepository = categoryRepository;
//     }

//     public List<ProductResponse> getAll() {
//         return productRepository.findAll().stream()
//                 .map(ProductMapper::toDto)
//                 .collect(Collectors.toList());
//     }

//     public Product getById(Long id) {
//         return productRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Product not found"));
//     }

//     public Product create(Product product, Long categoryId) {
//         Category category = categoryRepository.findById(categoryId)
//                 .orElseThrow(() -> new RuntimeException("Category not found"));

//         product.setCategory(category);
//         return productRepository.save(product);
//     }

//     public Product update(Long id, Product product, Long categoryId) {
//         Product existing = getById(id);

//         Category category = categoryRepository.findById(categoryId)
//                 .orElseThrow(() -> new RuntimeException("Category not found"));

//         existing.setName(product.getName());
//         existing.setType(product.getType());
//         existing.setSize(product.getSize());
//         existing.setDescription(product.getDescription());
//         existing.setCategory(category);

//         return productRepository.save(existing);
//     }

//     public void delete(Long id) {
//         productRepository.deleteById(id);
//     }
// }


package mcit.af.backend_temp.service;

import mcit.af.backend_temp.dto.ProductRequest;
import mcit.af.backend_temp.dto.ProductResponse;
import mcit.af.backend_temp.entity.Category;
import mcit.af.backend_temp.entity.Product;
import mcit.af.backend_temp.repository.CategoryRepository;
import mcit.af.backend_temp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    public ProductResponse createProduct(ProductRequest request) {
        Product product = request.toProduct();
        
        Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));
        product.setCategory(category);
        
        Product saved = productRepository.save(product);
        return convertToResponse(saved);
    }
    
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product existing = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        existing.setName(request.getName());
        existing.setType(request.getType());
        existing.setSize(request.getSize());
        existing.setDescription(request.getDescription());
        
        Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));
        existing.setCategory(category);
        
        Product updated = productRepository.save(existing);
        return convertToResponse(updated);
    }
    
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