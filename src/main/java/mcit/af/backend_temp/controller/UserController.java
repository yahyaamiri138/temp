// package mcit.af.backend_temp.controller;

// import lombok.RequiredArgsConstructor;
// import mcit.af.backend_temp.dto.UserRequest;
// import mcit.af.backend_temp.dto.UserResponse;
// import mcit.af.backend_temp.service.UserService;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/users")
// @RequiredArgsConstructor
// @CrossOrigin("*")
// public class UserController {

//     private final UserService userService;

//     // ✅ GET ALL USERS
//     @GetMapping
//     public List<UserResponse> getAllUsers() {
//         return userService.getAllUsers();
//     }

//     // ✅ GET USER BY ID
//     @GetMapping("/{id}")
//     public UserResponse getUserById(@PathVariable Long id) {
//         return userService.getUserById(id);
//     }

//     // ✅ CREATE USER
//     @PostMapping
//     public UserResponse createUser(@RequestBody UserRequest request) {
//         return userService.createUser(request);
//     }

//     // ✅ UPDATE USER
//     @PutMapping("/{id}")
//     public UserResponse updateUser(
//             @PathVariable Long id,
//             @RequestBody UserRequest request
//     ) {
//         return userService.updateUser(id, request);
//     }

//     // ✅ DELETE USER
//     @DeleteMapping("/{id}")
//     public void deleteUser(@PathVariable Long id) {
//         userService.deleteUser(id);
//     }
// }


package mcit.af.backend_temp.controller;

import lombok.RequiredArgsConstructor;
import mcit.af.backend_temp.dto.UserRequest;
import mcit.af.backend_temp.dto.UserResponse;
import mcit.af.backend_temp.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    // ===============================
    // ✅ ADMIN - GET ALL USERS
    // ===============================
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // ===============================
    // ✅ ADMIN - GET USER BY ID
    // ===============================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // ===============================
    // 🔐 ADMIN - CREATE USER
    // ===============================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    // ===============================
    // 🌍 PUBLIC - REGISTER
    // ===============================
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserRequest request) {

        // امنیت: همیشه USER ساخته شود
        request.setRole("ROLE_ADMIN");

        return ResponseEntity.ok(userService.createUser(request));
    }

    // ===============================
    // 🔐 ADMIN - UPDATE USER
    // ===============================
    // @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UserRequest request
    ) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    // ===============================
    // 🔐 ADMIN - DELETE USER
    // ===============================
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // ===============================
    // 📤 ADMIN - EXPORT USERS (CSV)
    // ===============================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportUsers() {

        List<UserResponse> users = userService.getAllUsers();

        StringBuilder csv = new StringBuilder();
        csv.append("ID,Username,Role,FirstName,LastName,Email,Gender\n");

        for (UserResponse user : users) {
            csv.append(user.getId()).append(",")
               .append(user.getUsername()).append(",")
               .append(user.getRole()).append(",")
               .append(user.getFirstName()).append(",")
               .append(user.getLastName()).append(",")
               .append(user.getEmail()).append(",")
               .append(user.getGender()).append("\n");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv.toString().getBytes());
    }
}