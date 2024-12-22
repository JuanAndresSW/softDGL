package dev.partenon.museumcontext.openinghours.application;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museumcontext.openinghours.doamin.UpdateOpeningHoursCommand;
import dev.partenon.museumcontext.core.doamin.Museum;
import dev.partenon.museumcontext.openinghours.doamin.OpeningHours;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class UpdateOpeningHoursCommandHandler implements CommandHandler<UpdateOpeningHoursCommand> {

    @Autowired
    private OpeningHoursRepository repository;

    @Override
    public void handle(UpdateOpeningHoursCommand command) throws Exception {
        var currentHours = repository.findByMuseum(new Museum(command.getMuseumId()));
        var updatedHours = OpeningHours.create(command, currentHours);
        repository.saveAndFlush(updatedHours);
    }
}
