package mcit.af.backend_temp.service;

import lombok.RequiredArgsConstructor;

import mcit.af.backend_temp.dto.DebtRequest;
import mcit.af.backend_temp.entity.Debt;
import mcit.af.backend_temp.entity.Party;
import mcit.af.backend_temp.repository.DebtRepository;
import mcit.af.backend_temp.repository.PartyRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DebtService {

    private final DebtRepository debtRepository;

    private final PartyRepository partyRepository;

    // ================= GET =================

    public List<Debt> getAll() {
        return debtRepository.findAll();
    }

    // ================= CREATE =================

    public Debt create(DebtRequest request) {

        Party party = partyRepository.findById(request.getPartyId())
                .orElseThrow(() -> new RuntimeException("Party not found"));

        BigDecimal paidAmount = request.getPaidAmount() != null
                ? request.getPaidAmount()
                : BigDecimal.ZERO;

        BigDecimal remaining =
                request.getAmount().subtract(paidAmount);

        Debt debt = new Debt();

        debt.setParty(party);
        debt.setAmount(request.getAmount());
        debt.setPaidAmount(paidAmount);
        debt.setRemainingAmount(remaining);
        debt.setDescription(request.getDescription());
        debt.setDueDate(request.getDueDate());
        debt.setType(request.getType());

        debt.setPaid(
                remaining.compareTo(BigDecimal.ZERO) <= 0
        );

        return debtRepository.save(debt);
    }

    // ================= UPDATE =================

    public Debt update(Long id, DebtRequest request) {

        Debt debt = debtRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Debt not found"));

        Party party = partyRepository.findById(request.getPartyId())
                .orElseThrow(() -> new RuntimeException("Party not found"));

        BigDecimal paidAmount = request.getPaidAmount() != null
                ? request.getPaidAmount()
                : BigDecimal.ZERO;

        BigDecimal remaining =
                request.getAmount().subtract(paidAmount);

        debt.setParty(party);
        debt.setAmount(request.getAmount());
        debt.setPaidAmount(paidAmount);
        debt.setRemainingAmount(remaining);
        debt.setDescription(request.getDescription());
        debt.setDueDate(request.getDueDate());
        debt.setType(request.getType());

        debt.setPaid(
                remaining.compareTo(BigDecimal.ZERO) <= 0
        );

        return debtRepository.save(debt);
    }

    // ================= DELETE =================

    public void delete(Long id) {
        debtRepository.deleteById(id);
    }
}