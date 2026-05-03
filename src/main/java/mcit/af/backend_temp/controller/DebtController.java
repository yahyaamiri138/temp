package mcit.af.backend_temp.controller;

import mcit.af.backend_temp.entity.Debt;
import mcit.af.backend_temp.service.DebtService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/debts")
public class DebtController {

    private final DebtService service;

    public DebtController(DebtService service) {
        this.service = service;
    }

    @GetMapping
    public List<Debt> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Debt create(@RequestBody Debt debt) {
        return service.create(debt);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}