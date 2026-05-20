package mcit.af.backend_temp.controller;

import lombok.RequiredArgsConstructor;
import mcit.af.backend_temp.dto.TransactionRequest;
import mcit.af.backend_temp.entity.Transaction;
import mcit.af.backend_temp.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService service;

    // ================= GET ALL =================
    @GetMapping
    public List<Transaction> getAll() {
        return service.getAll();
    }

    // ================= CREATE =================
    @PostMapping
    public Transaction create(
            @RequestBody TransactionRequest request
    ) {
        return service.create(request);
    }

    // ================= DELETE =================
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    
// ================= UPDATE =================
    @PutMapping("/{id}")
public Transaction update(
        @PathVariable Long id,
        @RequestBody TransactionRequest request
) {
    return service.update(id, request);
}
}