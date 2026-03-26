package mcit.af.backend_temp.service;

import mcit.af.backend_temp.dto.CategoryResponse;
import mcit.af.backend_temp.entity.Category;
import mcit.af.backend_temp.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // ✅ Constructor Injection (better than @Autowired)
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // ✅ GET ALL
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ✅ GET BY ID
    public CategoryResponse getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(this::convertToResponse)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    // ✅ CREATE
    public CategoryResponse createCategory(Category category) {
        Category saved = categoryRepository.save(category);
        return convertToResponse(saved);
    }

    // ✅ UPDATE
    public CategoryResponse updateCategory(Long id, Category category) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        existing.setName(category.getName());

        Category updated = categoryRepository.save(existing);
        return convertToResponse(updated);
    }

    // ✅ DELETE
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }

    // ✅ MAPPER (Entity → DTO)
    private CategoryResponse convertToResponse(Category category) {
        CategoryResponse response = new CategoryResponse();
        response.setId(category.getId());
        response.setName(category.getName());
        return response;
    }
}