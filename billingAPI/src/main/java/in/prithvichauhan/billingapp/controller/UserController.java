package in.prithvichauhan.billingapp.controller;

import in.prithvichauhan.billingapp.io.UserRequest;
import in.prithvichauhan.billingapp.io.UserResponse;
import in.prithvichauhan.billingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class UserController {

    @Autowired
    private UserService userService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody UserRequest request) {

        try {
            return userService.createUser(request);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to create user " + e.getMessage());

        }
    }

    @GetMapping("/users")
    public List<UserResponse> readUsers() {
        return userService.readUsers();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/users/{id}")
    public void deleteUsers(@PathVariable String id) {
        try {
            userService.deleteUser(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

}
