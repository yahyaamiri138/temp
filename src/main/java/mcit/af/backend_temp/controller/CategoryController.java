package mcit.af.backend_temp.controller;

import mcit.af.backend_temp.dto.CategoryResponse;
import mcit.af.backend_temp.entity.Category;
import mcit.af.backend_temp.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<CategoryResponse> getAll() {
        return service.getAllCategories();
    }

    @PostMapping
    public CategoryResponse create(@RequestBody Category category) {
        return service.createCategory(category);
    }

    @PutMapping("/{id}")
    public CategoryResponse update(@PathVariable Long id,
                                   @RequestBody Category category) {
        return service.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteCategory(id);
    }
}