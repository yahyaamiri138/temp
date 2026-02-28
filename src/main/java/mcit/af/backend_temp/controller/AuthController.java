package mcit.af.backend_temp.controller;

import lombok.RequiredArgsConstructor;
import mcit.af.backend_temp.dto.AuthRequest;
import mcit.af.backend_temp.dto.AuthResponse;
import mcit.af.backend_temp.entity.User;
import mcit.af.backend_temp.repository.UserRepository;
import mcit.af.backend_temp.security.JwtUtil;
import mcit.af.backend_temp.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // @PostMapping("/register")
    // public ResponseEntity<?> register(@RequestBody AuthRequest request) {

    //     if (userRepository.findByUsername(request.getUsername()).isPresent()) {
    //         return ResponseEntity.badRequest().body("Username already exists");
    //     }

    //     User user = new User();
    // user.setUsername(request.getUsername());
    // user.setPassword(passwordEncoder.encode(request.getPassword()));
    // user.setFirstName(request.getFirstName());
    // user.setLastName(request.getLastName());
    // user.setEmail(request.getEmail());
    // user.setGender(request.getGender());
    // user.setRole("ROLE_USER");

    //     userRepository.save(user);

    //     String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

    //       return ResponseEntity.ok(
    //         new AuthResponse(
    //                 token,
    //                 user.getUsername(),
    //                 user.getRole(),
    //                 user.getFirstName(),
    //                 user.getLastName(),
    //                 user.getEmail(),
    //                 user.getGender()
    //         )
    // );
    // }
    @PostMapping("/register")
public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
    return ResponseEntity.ok(authService.register(request));
}

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

//     User user = userRepository.findByUsername(request.getUsername())
//             .orElseThrow(() -> new RuntimeException("User not found"));

//     if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//         return ResponseEntity.badRequest().body("Invalid credentials");
//     }

//     String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

//     return ResponseEntity.ok(
//             new AuthResponse(
//                     token,
//                     user.getUsername(),
//                     user.getRole(),
//                     user.getFirstName(),
//                     user.getLastName(),
//                     user.getEmail(),
//                     user.getGender()
//             )
//     );
// }
@PostMapping("/login")
public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
    return ResponseEntity.ok(authService.login(request));
}
}