package dev.partenon.museum.infrastructure.write;

import dev.partenon.global.domain.abstractcomponents.command.CommandBus;
import dev.partenon.museum.domain.commands.SaveDescriptionCommand;
import dev.partenon.museum.domain.model.DescriptionModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/museums")
public class SaveDescriptionResource {
    private final CommandBus commandBus;

    @Autowired
    public SaveDescriptionResource(CommandBus commandBus){
        this.commandBus = commandBus;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/descriptions")
    public ResponseEntity<Void> saveBanners(@RequestBody @Valid DescriptionModel description,
                                            @RequestParam("key") String museumId) throws Exception{
        var command = SaveDescriptionCommand.builder()
                .description(description.getDescription())
                .museumId(Long.valueOf(museumId))
                .build();

        commandBus.handle(command);

        return ResponseEntity.created(
                        new URI("http://localhost:8080/api/museums/descriptions&key=".concat(museumId)))
                .build();
    }
}
