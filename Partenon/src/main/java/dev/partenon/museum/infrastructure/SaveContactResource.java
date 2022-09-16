package dev.partenon.museum.infrastructure;

import dev.partenon.global.domain.abstractcomponents.command.CommandBus;
import dev.partenon.museum.domain.commands.SaveContactCommand;
import dev.partenon.museum.domain.model.ContactRestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotEmpty;
import java.net.URI;

@RestController
@RequestMapping("/api/museums")
public class SaveContactResource {
    private final CommandBus commandBus;

    @Autowired
    public SaveContactResource(CommandBus commandBus){
        this.commandBus = commandBus;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/contacts")
    public ResponseEntity<Void> saveBanners(@RequestBody @NotEmpty ContactRestModel contactRestModel,
                                            @RequestParam("key") String museumId) throws Exception{
        var command = SaveContactCommand.builder()
                .contact(contactRestModel.getContact())
                .type(contactRestModel.getType())
                .museumId(Long.valueOf(museumId))
                .build();

        commandBus.handle(command);

        return ResponseEntity.created(
                        new URI("http://localhost:8080/api/museums/contacts&key=".concat(museumId)))
                .build();
    }
}
