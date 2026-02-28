package mcit.af.backend_temp.service;

import lombok.RequiredArgsConstructor;
import mcit.af.backend_temp.dto.AuthRequest;
import mcit.af.backend_temp.dto.AuthResponse;
import mcit.af.backend_temp.entity.User;
import mcit.af.backend_temp.repository.UserRepository;
import mcit.af.backend_temp.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

   public AuthResponse register(AuthRequest request) {

    if (userRepository.findByUsername(request.getUsername()).isPresent()) {
        throw new RuntimeException("Username already exists");
    }

    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    // 👇 جدید
    user.setFirstName(request.getFirstName());
    user.setLastName(request.getLastName());
    user.setEmail(request.getEmail());
    user.setGender(request.getGender());

    user.setRole("ROLE_USER");

    userRepository.save(user);

    String token = jwtUtil.generateToken(
            user.getUsername(),
            user.getRole()
    );

    return new AuthResponse(
            token,
            user.getUsername(),
            user.getRole(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getGender()
    );
}

    public AuthResponse login(AuthRequest request) {

    User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid credentials");
    }

    String token = jwtUtil.generateToken(
            user.getUsername(),
            user.getRole()
    );

    return new AuthResponse(
            token,
            user.getUsername(),
            user.getRole(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getGender()
    );
}
}