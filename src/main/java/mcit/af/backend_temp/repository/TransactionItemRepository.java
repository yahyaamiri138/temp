package mcit.af.backend_temp.repository;

import mcit.af.backend_temp.entity.TransactionItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionItemRepository extends JpaRepository<TransactionItem, Long> {
}