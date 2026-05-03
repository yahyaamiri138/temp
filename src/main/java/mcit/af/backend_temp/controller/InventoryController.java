package mcit.af.backend_temp.controller;

import mcit.af.backend_temp.entity.Inventory;
import mcit.af.backend_temp.service.InventoryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<Inventory> getAll() {
        return service.getAll();
    }
}