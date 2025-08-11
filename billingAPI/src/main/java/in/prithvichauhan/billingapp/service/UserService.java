package in.prithvichauhan.billingapp.service;

import in.prithvichauhan.billingapp.io.UserRequest;
import in.prithvichauhan.billingapp.io.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest userRequest);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
