package in.prithvichauhan.billingapp.service.implementation;

import in.prithvichauhan.billingapp.entity.UserEntity;
import in.prithvichauhan.billingapp.io.UserRequest;
import in.prithvichauhan.billingapp.io.UserResponse;
import in.prithvichauhan.billingapp.repository.UserRepository;
import in.prithvichauhan.billingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public UserResponse createUser(UserRequest userRequest) {

        UserEntity userEntity = convertToEntity(userRequest);
        userEntity = userRepository.save(userEntity);
        return convertToResponse(userEntity);
    }

    private UserResponse convertToResponse(UserEntity userEntity) {

        return UserResponse.builder()
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .userId(userEntity.getUserId())
                .createdAt(userEntity.getCreatedAt())
                .updatedAt(userEntity.getUpdatedAt())
                .role(userEntity.getRole())
                .build();

    }

    private UserEntity convertToEntity(UserRequest userRequest) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(userRequest.getRole().toUpperCase())
                .name(userRequest.getName())
                .build();
    }

    @Override
    public String getUserRole(String email) {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found for the email: " + email));
        return userEntity.getRole();
    }

    @Override
    public List<UserResponse> readUsers() {
        return userRepository.findAll().stream().map(this::convertToResponse).toList();
    }

    @Override
    public void deleteUser(String userId) {
        UserEntity userEntity = userRepository.findByUserId(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userRepository.delete(userEntity);
    }
}
