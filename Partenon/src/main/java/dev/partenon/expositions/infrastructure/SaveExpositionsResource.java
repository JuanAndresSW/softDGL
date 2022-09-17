package dev.partenon.expositions.infrastructure;

import dev.partenon.expositions.domain.SaveExpositionCommand;
import dev.partenon.expositions.domain.model.ExpositionRestModel;
import dev.partenon.global.domain.abstractcomponents.command.CommandBus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/api/expositions")
public class SaveExpositionsResource {
    private final CommandBus commandBus;

    @Autowired
    public SaveExpositionsResource(CommandBus commandBus){
        this.commandBus = commandBus;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Void> saveBanners(@RequestBody @Valid ExpositionRestModel expositionRestModel,
                                            @RequestParam("key") long museumId) throws Exception{
        var command = SaveExpositionCommand.builder()
                .photo(expositionRestModel.getPhoto())
                .description(expositionRestModel.getDescription())
                .name(expositionRestModel.getName())
                .category(expositionRestModel.getCategory())
                .museumId(museumId)
                .build();
        commandBus.handle(command);
        return ResponseEntity.created(
                        new URI("http://localhost:8080/api/expositions&key=".concat(String.valueOf(museumId))))
                .build();
    }
}
