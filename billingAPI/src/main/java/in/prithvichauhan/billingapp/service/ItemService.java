package in.prithvichauhan.billingapp.service;


import in.prithvichauhan.billingapp.io.ItemRequest;
import in.prithvichauhan.billingapp.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);
}
