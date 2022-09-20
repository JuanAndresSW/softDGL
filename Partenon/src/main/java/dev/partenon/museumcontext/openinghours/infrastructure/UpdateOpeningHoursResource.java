package dev.partenon.museumcontext.openinghours.infrastructure;

import dev.partenon.global.domain.abstractcomponents.command.CommandBus;
import dev.partenon.museumcontext.openinghours.doamin.UpdateOpeningHoursCommand;
import dev.partenon.museumcontext.openinghours.doamin.OpeningHoursRestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/museums")
public class UpdateOpeningHoursResource {
    private final CommandBus commandBus;

    @Autowired
    public UpdateOpeningHoursResource(CommandBus commandBus){
        this.commandBus = commandBus;
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/openings")
    public ResponseEntity<Void> saveOpeningHour(@RequestBody @Valid OpeningHoursRestModel openingHoursRestModel,
                                                @RequestParam("key") String museumId) throws Exception{
        var command = UpdateOpeningHoursCommand.builder()
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

        return ResponseEntity.noContent().build();
    }
}
