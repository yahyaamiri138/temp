package mcit.af.backend_temp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
}