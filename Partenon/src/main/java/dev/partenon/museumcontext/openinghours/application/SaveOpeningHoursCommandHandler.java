package dev.partenon.museumcontext.openinghours.application;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.openinghours.doamin.SaveOpeningHoursCommand;
import dev.partenon.museumcontext.openinghours.doamin.OpeningHours;
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
