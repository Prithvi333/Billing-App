package in.prithvichauhan.billingapp.service.implementation;

import in.prithvichauhan.billingapp.entity.CategoryEntity;
import in.prithvichauhan.billingapp.entity.ItemEntity;
import in.prithvichauhan.billingapp.io.ItemRequest;
import in.prithvichauhan.billingapp.io.ItemResponse;
import in.prithvichauhan.billingapp.repository.CategoryRepository;
import in.prithvichauhan.billingapp.repository.ItemRepository;
import in.prithvichauhan.billingapp.service.FileUploadService;
import in.prithvichauhan.billingapp.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class ItemServiceImp implements ItemService {

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        String imgUrl = fileUploadService.uploadFile(file);
        ItemEntity newItem = convertToEntity(request);
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found: " + request.getCategoryId()));
        newItem.setCategory(existingCategory);
        newItem.setImgUrl(imgUrl);
        newItem = itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    private ItemResponse convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imgUrl(newItem.getImgUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest request) {

        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll().stream().map(this::convertToResponse).toList();
    }

    @Override
    public void deleteItem(String itemId) {

        ItemEntity itemEntity = itemRepository.findByItemId(itemId).orElseThrow(() -> new RuntimeException("Item not found: " + itemId));
        boolean isFileDeleted = fileUploadService.deleteFile(itemEntity.getImgUrl());

        if (isFileDeleted) {
            itemRepository.delete(itemEntity);
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete the image");
        }
    }
}
