package dev.partenon.museum.application.handlers;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museum.application.repository.ContactRepository;
import dev.partenon.museum.application.repository.MuseumRepository;
import dev.partenon.museum.domain.commands.SaveContactCommand;
import dev.partenon.museum.domain.entity.MuseumContact;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class SaveContactCommandHandler implements CommandHandler<SaveContactCommand> {
    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private MuseumRepository museumRepository;

    @Override
    public void handle(SaveContactCommand command) throws Exception {
        var museum = museumRepository.findByMuseumId(command.getMuseumId());
        if(museum.isEmpty())
            throw new Exception("ID no registrado");

        contactRepository.save(MuseumContact.create(command,museum.get()));
    }
}
