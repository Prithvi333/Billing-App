package in.prithvichauhan.billingapp.controller;

import in.prithvichauhan.billingapp.io.AuthRequest;
import in.prithvichauhan.billingapp.io.AuthResponse;
import in.prithvichauhan.billingapp.service.UserService;
import in.prithvichauhan.billingapp.service.implementation.AppUserDetailsService;
import in.prithvichauhan.billingapp.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    AppUserDetailsService appUserDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest
                                      request) throws Exception {
        authenticate(request.getEmail(), request.getPassword());
        UserDetails userDetails = appUserDetailsService.loadUserByUsername(request.getEmail());
        String jwtToken = jwtUtil.generateToken(userDetails);
        String role = userService.getUserRole(request.getEmail());
        return new AuthResponse(request.getEmail(), jwtToken, role);
    }

    private void authenticate(String email, String password) throws Exception {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        } catch (DisabledException e) {
            throw new Exception("User disabled");

        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email or password is incorrect");
        }

    }

    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String, String> request) {
        return passwordEncoder.encode(request.get("password"));
    }


}
