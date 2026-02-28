package mcit.af.backend_temp.service;

import lombok.RequiredArgsConstructor;
import mcit.af.backend_temp.dto.UserRequest;
import mcit.af.backend_temp.dto.UserResponse;
import mcit.af.backend_temp.entity.User;
import mcit.af.backend_temp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ GET ALL
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
               .map(user -> new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getRole(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getGender()
        ))
                .collect(Collectors.toList());
    }

    // ✅ GET BY ID
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getRole(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getGender()
        );
    }

    // ✅ CREATE
    public UserResponse createUser(UserRequest request) {

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setGender(request.getGender());
        user.setRole(
                (request.getRole() == null || request.getRole().isBlank())
                        ? "ROLE_USER"
                        : request.getRole()
        );

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getRole(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getEmail(),
                savedUser.getGender()
        );
    }


  // ✅ UPDATE
public UserResponse updateUser(Long id, UserRequest request) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (request.getUsername() != null) {
        user.setUsername(request.getUsername());
    }

    if (request.getPassword() != null && !request.getPassword().isEmpty()) {
        user.setPassword(passwordEncoder.encode(request.getPassword()));
    }

    if (request.getRole() != null && !request.getRole().isEmpty()) {
        user.setRole(request.getRole());
    }

    // 🔥 THIS PART WAS MISSING
    if (request.getFirstName() != null) {
        user.setFirstName(request.getFirstName());
    }

    if (request.getLastName() != null) {
        user.setLastName(request.getLastName());
    }

    if (request.getEmail() != null) {
        user.setEmail(request.getEmail());
    }

    if (request.getGender() != null) {
        user.setGender(request.getGender());
    }

    userRepository.save(user);

    return new UserResponse(
            user.getId(),
            user.getUsername(),
            user.getRole(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getGender()
    );
}

    // ✅ DELETE
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }
}