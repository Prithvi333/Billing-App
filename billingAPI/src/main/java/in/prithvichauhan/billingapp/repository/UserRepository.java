package in.prithvichauhan.billingapp.repository;

import in.prithvichauhan.billingapp.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String emailId);

    Optional<UserEntity> findByUserId(String userId);
}
