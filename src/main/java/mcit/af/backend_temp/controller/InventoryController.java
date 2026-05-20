package mcit.af.backend_temp.controller;

import lombok.RequiredArgsConstructor;
import mcit.af.backend_temp.dto.InventoryRequest;
import mcit.af.backend_temp.entity.Inventory;
import mcit.af.backend_temp.service.InventoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService service;

    // ================= GET ALL =================
    @GetMapping
    public List<Inventory> getAll() {
        return service.getAll();
    }

    // ================= CREATE =================
    @PostMapping
    public Inventory create(@RequestBody InventoryRequest inventoryRequest) {
        return service.create(inventoryRequest);
    }

    // ================= UPDATE =================
    @PutMapping("/{id}")
    public Inventory update(
            @PathVariable Long id,
            @RequestBody InventoryRequest inventoryRequest
    ) {
      return service.update(id, inventoryRequest);
    }

    // ================= DELETE =================
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}