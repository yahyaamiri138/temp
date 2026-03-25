package mcit.af.backend_temp.repository;
import mcit.af.backend_temp.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}