package dev.partenon.museum.domain.commands;

import dev.partenon.global.domain.abstractcomponents.command.Command;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@Builder
public class SaveMuseumAndUserCommand extends Command {
    @NotEmpty
    @Size(min = 2, max = 20)
    private String username;
    @NotEmpty
    @Size(min = 14, max = 128)
    private String email;
    @NotEmpty
    private String password;
    @NotEmpty
    @Size(min = 2, max = 20)
    private String museumName;
    @NotEmpty
    @Size(min = 2, max = 20)
    private String country;
    @NotEmpty
    @Size(min = 2, max = 20)
    private String province;
    @NotEmpty
    @Size(min = 2, max = 20)
    private String city;
    @NotEmpty
    @Size(min = 2, max = 20)
    private String street;
    @NotEmpty
    @Size(min = 2, max = 20)
    private String addressNumber;

}
