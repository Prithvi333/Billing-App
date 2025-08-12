package in.prithvichauhan.billingapp.repository;

import in.prithvichauhan.billingapp.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity, Long> {
}
