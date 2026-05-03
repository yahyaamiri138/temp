package mcit.af.backend_temp.repository;

import mcit.af.backend_temp.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}