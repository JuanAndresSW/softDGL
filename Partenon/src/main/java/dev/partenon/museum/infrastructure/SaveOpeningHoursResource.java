package dev.partenon.museum.infrastructure;

import dev.partenon.global.domain.abstractcomponents.command.CommandBus;
import dev.partenon.museum.domain.commands.SaveOpeningHoursCommand;
import dev.partenon.museum.domain.model.OpeningHoursRestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("api/museums")
public class SaveOpeningHoursResource {
    private final CommandBus commandBus;

    @Autowired
    public SaveOpeningHoursResource(CommandBus commandBus){
        this.commandBus = commandBus;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/openings")
    public ResponseEntity<Void> saveOpeningHour(@RequestBody @Valid OpeningHoursRestModel openingHoursRestModel,
                                                @RequestParam("key") String museumId) throws Exception{
        var command = SaveOpeningHoursCommand.builder()
                .monday(openingHoursRestModel.getMonday())
                .tuesday(openingHoursRestModel.getTuesday())
                .wednesday(openingHoursRestModel.getWednesday())
                .thursday(openingHoursRestModel.getThursday())
                .friday(openingHoursRestModel.getFriday())
                .saturday(openingHoursRestModel.getSaturday())
                .sunday(openingHoursRestModel.getSunday())
                .museumId(Long.parseLong(museumId))
                .build();

        commandBus.handle(command);

        return ResponseEntity
                .created(new URI("http://localhost:8080/api/museums/openings&key=".concat(museumId)))
                .build();
    }
}
