package mcit.af.backend_temp.service;

import mcit.af.backend_temp.dto.TransactionItemResponse;
import mcit.af.backend_temp.entity.TransactionItem;
import mcit.af.backend_temp.repository.TransactionItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionItemService {

    private final TransactionItemRepository repository;

    public TransactionItemService(TransactionItemRepository repository) {
        this.repository = repository;
    }

    public List<TransactionItemResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private TransactionItemResponse mapToResponse(TransactionItem item) {
        return TransactionItemResponse.builder()
                .id(item.getId())
                .productId(
                        item.getProduct() != null
                                ? item.getProduct().getId()
                                : null
                )
                .productName(
                        item.getProduct() != null
                                ? item.getProduct().getName()
                                : null
                )
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .transactionId(
                        item.getTransaction() != null
                                ? item.getTransaction().getId()
                                : null
                )
                .partyName(
                        item.getTransaction() != null &&
                        item.getTransaction().getParty() != null
                                ? item.getTransaction().getParty().getName()
                                : null
                )
                .transactionType(
                        item.getTransaction() != null
                                ? item.getTransaction().getType().name()
                                : null
                )
                .paymentType(
                        item.getTransaction() != null
                                ? item.getTransaction().getPaymentType().name()
                                : null
                )
                .build();
    }

    public TransactionItemResponse getById(Long id) {
    TransactionItem item = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("TransactionItem not found with id: " + id));
    return mapToResponse(item);
}

 public void delete(Long id) {
        repository.deleteById(id);
    }
}