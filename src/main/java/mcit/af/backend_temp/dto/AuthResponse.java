package mcit.af.backend_temp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String username;
    private String role;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
}