package mcit.af.backend_temp.service;

import mcit.af.backend_temp.entity.Debt;
import mcit.af.backend_temp.repository.DebtRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DebtService {

    private final DebtRepository debtRepository;

    public DebtService(DebtRepository debtRepository) {
        this.debtRepository = debtRepository;
    }

    public List<Debt> getAll() {
        return debtRepository.findAll();
    }

    public Debt create(Debt debt) {
        return debtRepository.save(debt);
    }

    public void delete(Long id) {
        debtRepository.deleteById(id);
    }
}