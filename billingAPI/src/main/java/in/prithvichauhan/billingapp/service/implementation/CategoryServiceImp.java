package in.prithvichauhan.billingapp.service.implementation;

import in.prithvichauhan.billingapp.entity.CategoryEntity;
import in.prithvichauhan.billingapp.io.CategoryRequest;
import in.prithvichauhan.billingapp.io.CategoryResponse;
import in.prithvichauhan.billingapp.repository.CategoryRepository;
import in.prithvichauhan.billingapp.repository.ItemRepository;
import in.prithvichauhan.billingapp.service.CategoryService;
import in.prithvichauhan.billingapp.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
public class CategoryServiceImp implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {
        String imgUrl = fileUploadService.uploadFile(file);
        CategoryEntity newCategory = convertToEntity(request);
        newCategory.setImgUrl(imgUrl);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll().stream().map(this::convertToResponse).toList();
    }

    @Override
    public void delete(String categoryId) {
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId).orElseThrow(() -> new RuntimeException("Category not found: " + categoryId));
        fileUploadService.deleteFile(existingCategory.getImgUrl());
        categoryRepository.delete(existingCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        Integer itemsCount = itemRepository.countByCategoryId(newCategory.getId());

        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .items(itemsCount)
                .updatedAt(newCategory.getUpdatedAt()).build();

    }

    private CategoryEntity convertToEntity(CategoryRequest request) {

        return CategoryEntity.builder().categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor()).build();

    }
}
