package mcit.af.backend_temp.controller;

import mcit.af.backend_temp.entity.Transaction;
import mcit.af.backend_temp.service.TransactionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Transaction> getAll() {
        return service.getAll();
    }
}