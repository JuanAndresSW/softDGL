package dev.partenon.museumcontext.contact.application;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.contact.doamin.SaveContactCommand;
import dev.partenon.museumcontext.contact.doamin.MuseumContact;
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
