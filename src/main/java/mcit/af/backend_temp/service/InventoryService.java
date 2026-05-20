package mcit.af.backend_temp.service;

import lombok.RequiredArgsConstructor;
import mcit.af.backend_temp.dto.InventoryRequest;
import mcit.af.backend_temp.entity.Inventory;
import mcit.af.backend_temp.entity.Product;
import mcit.af.backend_temp.repository.InventoryRepository;
import mcit.af.backend_temp.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository repository;
    private final ProductRepository productRepository;

    // ================= GET ALL =================
    public List<Inventory> getAll() {
        return repository.findAll();
    }

   // ================= CREATE =================
    public Inventory create(InventoryRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Inventory inventory = new Inventory();

        inventory.setProduct(product);
        inventory.setQuantity(request.getQuantity());

        return repository.save(inventory);
    }

     // ================= UPDATE =================
    public Inventory update(Long id, InventoryRequest request) {

        Inventory inventory = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        inventory.setProduct(product);
        inventory.setQuantity(request.getQuantity());

        return repository.save(inventory);
    }
    // ================= DELETE =================
    public void delete(Long id) {
        repository.deleteById(id);
    }
}