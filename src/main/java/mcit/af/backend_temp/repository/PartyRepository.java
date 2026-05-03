package mcit.af.backend_temp.repository;

import mcit.af.backend_temp.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartyRepository extends JpaRepository<Party, Long> {
}