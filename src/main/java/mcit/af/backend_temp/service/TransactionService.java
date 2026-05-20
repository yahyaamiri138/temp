package mcit.af.backend_temp.service;

import lombok.RequiredArgsConstructor;
import mcit.af.backend_temp.dto.TransactionItemRequest;
import mcit.af.backend_temp.dto.TransactionRequest;
import mcit.af.backend_temp.entity.*;
import mcit.af.backend_temp.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;  // ✅ Added this
    private final TransactionItemRepository itemRepository;     // ✅ Added this
    private final PartyRepository partyRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    
    public List<Transaction> getAll() {
        return transactionRepository.findAll();
    }

    // ================= CREATE =================
    @Transactional
    public Transaction create(TransactionRequest request) {
        Party party = partyRepository.findById(request.getPartyId())
                .orElseThrow(() -> new RuntimeException("Party not found"));
        
        Transaction transaction = new Transaction();
        transaction.setParty(party);
        transaction.setDate(LocalDateTime.now());
        transaction.setType(request.getType());
        transaction.setPaymentType(request.getPaymentType());
        
        List<TransactionItem> items = new ArrayList<>();
        double total = 0;
        
        for (TransactionItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            
            TransactionItem item = new TransactionItem();
            item.setProduct(product);
            item.setQuantity(itemRequest.getQuantity());
            item.setPrice(itemRequest.getPrice());
            item.setTransaction(transaction);
            items.add(item);
            total += itemRequest.getQuantity() * itemRequest.getPrice();
            
            // ================= INVENTORY UPDATE =================
            Inventory inventory = inventoryRepository
                    .findByProductId(product.getId())
                    .orElse(null);
            
            if (inventory != null) {
                if (request.getType().name().equals("SELL")) {
                    inventory.setQuantity(
                            inventory.getQuantity() - itemRequest.getQuantity()
                    );
                } else {
                    inventory.setQuantity(
                            inventory.getQuantity() + itemRequest.getQuantity()
                    );
                }
                inventoryRepository.save(inventory);
            }
        }

        transaction.setItems(items);
        transaction.setTotalAmount(total);
        return transactionRepository.save(transaction);
    }

    // ================= DELETE =================
    @Transactional
    public void delete(Long id) {
        transactionRepository.deleteById(id);
    }

    // ================= UPDATE =================
    @Transactional
    public Transaction update(Long id, TransactionRequest request) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        
        Party party = partyRepository.findById(request.getPartyId())
                .orElseThrow(() -> new RuntimeException("Party not found"));
        
        // OLD ITEMS REMOVE
        if (transaction.getItems() != null && !transaction.getItems().isEmpty()) {
            itemRepository.deleteAll(transaction.getItems());
        }
        
        transaction.setParty(party);
        transaction.setType(request.getType());
        transaction.setPaymentType(request.getPaymentType());
        
        List<TransactionItem> items = new ArrayList<>();
        double total = 0;
        
        for (TransactionItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            
            TransactionItem item = new TransactionItem();
            item.setProduct(product);
            item.setQuantity(itemRequest.getQuantity());
            item.setPrice(itemRequest.getPrice());
            item.setTransaction(transaction);
            total += itemRequest.getQuantity() * itemRequest.getPrice();
            items.add(item);
        }

        transaction.setItems(items);
        transaction.setTotalAmount(total);
        return transactionRepository.save(transaction);
    }
}