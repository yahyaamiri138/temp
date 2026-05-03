package mcit.af.backend_temp.repository;

import mcit.af.backend_temp.entity.Debt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DebtRepository extends JpaRepository<Debt, Long> {
}