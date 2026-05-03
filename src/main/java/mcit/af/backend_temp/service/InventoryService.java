package mcit.af.backend_temp.service;

import mcit.af.backend_temp.entity.Inventory;
import mcit.af.backend_temp.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class InventoryService {

    private final InventoryRepository repo;

    public InventoryService(InventoryRepository repo) {
        this.repo = repo;
    }

    public List<Inventory> getAll() {
        return repo.findAll();
    }
}