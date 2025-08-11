package in.prithvichauhan.billingapp.service.implementation;

import in.prithvichauhan.billingapp.entity.UserEntity;
import in.prithvichauhan.billingapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email not found foe the email id: " + email));
        return new User(userEntity.getEmail(), userEntity.getPassword(), Collections.singleton(new SimpleGrantedAuthority(userEntity.getRole())));
    }
}
