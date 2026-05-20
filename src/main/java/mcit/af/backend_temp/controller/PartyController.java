package mcit.af.backend_temp.controller;

import lombok.RequiredArgsConstructor;
import mcit.af.backend_temp.dto.PartyRequest;
import mcit.af.backend_temp.entity.Party;
import mcit.af.backend_temp.service.PartyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parties")
@RequiredArgsConstructor
public class PartyController {

    private final PartyService service;

    // ================= GET ALL =================
    @GetMapping
    public List<Party> getAll() {
        return service.getAll();
    }

    // ================= CREATE =================
    @PostMapping
    public Party create(@RequestBody PartyRequest request) {
        return service.create(request);
    }

    // ================= UPDATE =================
    @PutMapping("/{id}")
    public Party update(
            @PathVariable Long id,
            @RequestBody PartyRequest request
    ) {
        return service.update(id, request);
    }

    // ================= DELETE =================
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}