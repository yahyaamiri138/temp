package mcit.af.backend_temp.service;

import mcit.af.backend_temp.entity.Party;
import mcit.af.backend_temp.repository.PartyRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PartyService {

    private final PartyRepository repo;

    public PartyService(PartyRepository repo) {
        this.repo = repo;
    }

    public List<Party> getAll() {
        return repo.findAll();
    }

    public Party save(Party p) {
        return repo.save(p);
    }
}