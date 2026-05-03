package mcit.af.backend_temp.service;

import mcit.af.backend_temp.entity.TransactionItem;
import mcit.af.backend_temp.repository.TransactionItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;



@Service
public class TransactionItemService {

    private final TransactionItemRepository repo;

    public TransactionItemService(TransactionItemRepository repo) {
        this.repo = repo;
    }

    public List<TransactionItem> getAll() {
        return repo.findAll();
    }
}