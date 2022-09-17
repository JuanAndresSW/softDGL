package dev.partenon.museum.infrastructure.write;

import dev.partenon.global.domain.abstractcomponents.command.CommandBus;
import dev.partenon.museum.domain.commands.SaveBuildingPlanCommand;
import dev.partenon.museum.domain.model.BuildingPlanRestModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/api/museums")
public class SaveBuildingPlanResource {
    private final CommandBus commandBus;

    @Autowired
    public SaveBuildingPlanResource(CommandBus commandBus){
        this.commandBus = commandBus;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/plans")
    public ResponseEntity<Void> saveBuildingPlan(@RequestBody @Valid BuildingPlanRestModel buildingPlan,
                                                 @RequestParam("key") String museumId) throws Exception{
        var command = SaveBuildingPlanCommand.builder()
                .buildingPlan(buildingPlan.getBuildingPlan())
                .museumId(Long.parseLong(museumId))
                .build();

        commandBus.handle(command);

        return ResponseEntity.created(
                new URI("http://localhost:8080/api/museums/building&key=".concat(museumId)))
                .build();
    }
}
