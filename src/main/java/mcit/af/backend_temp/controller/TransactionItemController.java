package mcit.af.backend_temp.controller;

import mcit.af.backend_temp.entity.TransactionItem;
import mcit.af.backend_temp.service.TransactionItemService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/transaction-items")
public class TransactionItemController {

    private final TransactionItemService service;

    public TransactionItemController(TransactionItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<TransactionItem> getAll() {
        return service.getAll();
    }
}