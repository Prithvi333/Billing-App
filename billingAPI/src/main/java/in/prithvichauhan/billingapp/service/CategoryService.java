package in.prithvichauhan.billingapp.service;

import in.prithvichauhan.billingapp.io.CategoryRequest;
import in.prithvichauhan.billingapp.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request, MultipartFile file);

    List<CategoryResponse> read();

    void delete(String categoryId);

}
