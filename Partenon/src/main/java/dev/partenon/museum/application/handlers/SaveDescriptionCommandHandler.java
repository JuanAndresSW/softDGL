package dev.partenon.museum.application.handlers;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museum.application.repository.ContactRepository;
import dev.partenon.museum.application.repository.DescriptionRepository;
import dev.partenon.museum.application.repository.MuseumRepository;
import dev.partenon.museum.domain.commands.SaveContactCommand;
import dev.partenon.museum.domain.commands.SaveDescriptionCommand;
import dev.partenon.museum.domain.entity.MuseumContact;
import dev.partenon.museum.domain.entity.MuseumDescription;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class SaveDescriptionCommandHandler implements CommandHandler<SaveDescriptionCommand> {
    @Autowired
    private DescriptionRepository descriptionRepository;
    @Autowired
    private MuseumRepository museumRepository;

    @Override
    public void handle(SaveDescriptionCommand command) throws Exception {
        var museum = museumRepository.findByMuseumId(command.getMuseumId());
        if(museum.isEmpty())
            throw new Exception("ID no registrado");

        descriptionRepository.save(MuseumDescription.create(command, museum.get()));
    }
}
