package dev.partenon.museumcontext.contact.application;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.contact.doamin.SaveContactCommand;
import dev.partenon.museumcontext.contact.doamin.entity.MuseumContact;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
/**Maneja el comando de SaveContactResource*/
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

        var contact = MuseumContact.create(command);

        //Comprueba si la operacion es de crear o actualizar
        if(!museum.get().getMuseumContacts().isEmpty()){
            museum.get().getMuseumContacts().forEach(x -> {
                if(x.getContactPK().getType() == contact.getContactPK().getType())
                    command.setFlag(false);
            });
        }

        contactRepository.save(contact);
    }
}
