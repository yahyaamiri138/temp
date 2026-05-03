package mcit.af.backend_temp.repository;

import mcit.af.backend_temp.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}