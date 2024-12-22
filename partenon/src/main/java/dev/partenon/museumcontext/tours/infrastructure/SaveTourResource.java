package dev.partenon.museumcontext.tours.infrastructure;

import dev.partenon.global.domain.abstractcomponents.command.CommandBus;
import dev.partenon.museumcontext.plan.doamin.BuildingPlanRestModel;
import dev.partenon.museumcontext.plan.doamin.SaveBuildingPlanCommand;
import dev.partenon.museumcontext.tours.domain.SaveTourCommand;
import dev.partenon.museumcontext.tours.domain.TourRestModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/museums")
public class SaveTourResource {
    private final CommandBus commandBus;

    @Autowired
    public SaveTourResource(CommandBus commandBus){
        this.commandBus = commandBus;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/tours")
    public HttpEntity<Void> saveTour(
            @RequestBody @Valid TourRestModel tourRestModel,
            @RequestParam("key") String museumId) throws Exception{
        var command = SaveTourCommand.builder()
                        .tourName(tourRestModel.getTourName())
                        .museumId(Long.valueOf(museumId))
                        .build();

        commandBus.handle(command);

        return ResponseEntity.created(
                        new URI("http://localhost:8080/api/museums/tours&key=".concat(museumId)))
                .build();
    }
}
