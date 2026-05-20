package mcit.af.backend_temp.dto;

import lombok.Getter;
import lombok.Setter;
import mcit.af.backend_temp.enumeration.PartyType;

@Getter
@Setter
public class PartyRequest {

    private String name;
    private String phone;
    private PartyType type;
}