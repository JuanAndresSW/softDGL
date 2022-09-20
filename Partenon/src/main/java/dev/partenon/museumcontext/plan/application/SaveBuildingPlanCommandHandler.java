package dev.partenon.museumcontext.plan.application;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.plan.doamin.SaveBuildingPlanCommand;
import dev.partenon.museumcontext.plan.doamin.MuseumPlan;
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
