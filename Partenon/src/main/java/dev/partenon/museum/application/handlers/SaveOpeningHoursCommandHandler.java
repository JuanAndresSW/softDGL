package dev.partenon.museum.application.handlers;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museum.application.repository.MuseumRepository;
import dev.partenon.museum.application.repository.OpeningHoursRepository;
import dev.partenon.museum.domain.commands.SaveOpeningHoursCommand;
import dev.partenon.museum.domain.entity.OpeningHours;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class SaveOpeningHoursCommandHandler implements CommandHandler<SaveOpeningHoursCommand> {
    @Autowired
    private MuseumRepository museumRepository;
    @Autowired
    private OpeningHoursRepository openingHoursRepository;

    @Override
    public void handle(SaveOpeningHoursCommand command) throws Exception {
        var museum = museumRepository.findByMuseumId(command.getMuseumId());
        if(museum.isEmpty())
            throw new Exception("ID no registrado");

        var openingHours = OpeningHours.create(command, museum.get());
        openingHoursRepository.save(openingHours);

    }
}
