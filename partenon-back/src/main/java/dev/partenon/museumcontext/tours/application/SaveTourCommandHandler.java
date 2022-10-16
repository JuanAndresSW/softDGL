package dev.partenon.museumcontext.tours.application;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.tours.domain.entity.MuseumTour;
import dev.partenon.museumcontext.tours.domain.SaveTourCommand;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**Maneja el comando echo por SaveTourResource*/
@AllArgsConstructor
@Service
public class SaveTourCommandHandler implements CommandHandler<SaveTourCommand> {
    @Autowired
    private TourRepository repository;
    @Autowired
    private MuseumRepository museumRepository;

    @Override
    public void handle(SaveTourCommand command) throws Exception {
        var museum = museumRepository.findByMuseumId(command.getMuseumId());
        if(museum.isEmpty())
            throw new Exception("ID no registrado");

        repository.save(new MuseumTour(command.getMuseumId(), command.getTourName()));
    }
}
