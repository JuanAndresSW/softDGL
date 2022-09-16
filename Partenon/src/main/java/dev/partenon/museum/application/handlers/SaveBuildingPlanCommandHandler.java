package dev.partenon.museum.application.handlers;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museum.application.repository.PlanRepository;
import dev.partenon.museum.application.repository.MuseumRepository;
import dev.partenon.museum.domain.commands.SaveBuildingPlanCommand;
import dev.partenon.museum.domain.entity.MuseumPlan;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@AllArgsConstructor
@Transactional
public class SaveBuildingPlanCommandHandler implements CommandHandler<SaveBuildingPlanCommand> {
    @Autowired
    private MuseumRepository museumRepository;
    @Autowired
    private PlanRepository planRepository;

    @Override
    public void handle(SaveBuildingPlanCommand command) throws Exception {
        var museum = museumRepository.findByMuseumId(command.getMuseumId());
        log.info("museum is: {}", museum.get());
        if(museum.isEmpty())
            throw new Exception("ID no registrado");

        var buildingPlan = MuseumPlan.create(command, museum.get() );

        planRepository.save(buildingPlan);

    }
}
