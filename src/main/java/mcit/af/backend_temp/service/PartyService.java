package mcit.af.backend_temp.service;

import lombok.RequiredArgsConstructor;
import mcit.af.backend_temp.dto.PartyRequest;
import mcit.af.backend_temp.entity.Party;
import mcit.af.backend_temp.repository.PartyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartyService {

    private final PartyRepository repo;

    // ================= GET ALL =================
    public List<Party> getAll() {
        return repo.findAll();
    }

    // ================= CREATE =================
    public Party create(PartyRequest request) {

        Party party = new Party();

        party.setName(request.getName());
        party.setPhone(request.getPhone());
        party.setType(request.getType());

        return repo.save(party);
    }

    // ================= UPDATE =================
    public Party update(Long id, PartyRequest request) {

        Party party = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Party not found"));

        party.setName(request.getName());
        party.setPhone(request.getPhone());
        party.setType(request.getType());

        return repo.save(party);
    }

    // ================= DELETE =================
    public void delete(Long id) {
        repo.deleteById(id);
    }
}