package dev.partenon.museumcontext.description.application;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.description.doamin.SaveDescriptionCommand;
import dev.partenon.museumcontext.description.doamin.MuseumDescription;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
/**Maneja el comando de SaveDescriptionResource*/
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
        if(museum.get().getMuseumDescription() == null) {
            descriptionRepository.saveAndFlush(MuseumDescription.create(command, museum.get()));
        } else {
            command.setFlag(false);
            museum.get().getMuseumDescription().setDescription(command.getDescription());
        }
    }
}
