package mcit.af.backend_temp.service;

import lombok.RequiredArgsConstructor;
import mcit.af.backend_temp.entity.Inventory;
import mcit.af.backend_temp.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository repository;

    public List<Inventory> getAll() {
        return repository.findAll();
    }

    public Inventory save(Inventory inventory) {
        return repository.save(inventory);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}