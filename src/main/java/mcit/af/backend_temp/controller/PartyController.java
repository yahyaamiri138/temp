package mcit.af.backend_temp.controller;

import mcit.af.backend_temp.entity.Party;
import mcit.af.backend_temp.service.PartyService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/parties")
public class PartyController {

    private final PartyService service;

    public PartyController(PartyService service) {
        this.service = service;
    }

    @GetMapping
    public List<Party> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Party create(@RequestBody Party p) {
        return service.save(p);
    }
}