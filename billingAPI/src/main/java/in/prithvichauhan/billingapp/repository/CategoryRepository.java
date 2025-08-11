package in.prithvichauhan.billingapp.repository;

import in.prithvichauhan.billingapp.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findByCategoryId(String aLong);
}
