package dev.partenon.expositions.application.handlers;

import dev.partenon.expositions.application.ExpositionRepository;
import dev.partenon.expositions.domain.Expositions;
import dev.partenon.expositions.domain.SaveExpositionCommand;
import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
/**Maneja el comando del SaveExpositionResource*/
public class SaveExpositionCommandHandler implements CommandHandler<SaveExpositionCommand> {
    @Autowired
    private ExpositionRepository expositionRepository;
    @Autowired
    private MuseumRepository museumRepository;

    @Override
    public void handle(SaveExpositionCommand command) throws Exception {
        var museum = museumRepository.findByMuseumId(command.getMuseumId());
        if(museum.isEmpty())
            throw new Exception("ID no registrado");

        expositionRepository.save(Expositions.create(command, museum.get()));

    }
}
