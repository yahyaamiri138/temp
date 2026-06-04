package mcit.af.backend_temp.controller;

import mcit.af.backend_temp.dto.TransactionItemResponse;
import mcit.af.backend_temp.service.TransactionItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transaction-items")
@CrossOrigin(origins = "*")
public class TransactionItemController {

    private final TransactionItemService service;

    public TransactionItemController(TransactionItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<TransactionItemResponse> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public TransactionItemResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}