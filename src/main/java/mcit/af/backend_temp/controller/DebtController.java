package mcit.af.backend_temp.controller;

import lombok.RequiredArgsConstructor;

import mcit.af.backend_temp.dto.DebtRequest;
import mcit.af.backend_temp.entity.Debt;
import mcit.af.backend_temp.service.DebtService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/debts")
@RequiredArgsConstructor
public class DebtController {

    private final DebtService service;

    @GetMapping
    public List<Debt> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Debt create(
            @RequestBody DebtRequest request
    ) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public Debt update(
            @PathVariable Long id,
            @RequestBody DebtRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}