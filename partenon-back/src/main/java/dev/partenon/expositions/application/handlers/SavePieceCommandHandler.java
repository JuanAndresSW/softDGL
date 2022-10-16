package dev.partenon.expositions.application.handlers;

import dev.partenon.expositions.application.ExpositionRepository;
import dev.partenon.expositions.application.PieceRepository;
import dev.partenon.expositions.domain.Expositions;
import dev.partenon.expositions.domain.Pieces;
import dev.partenon.expositions.domain.SaveExpositionCommand;
import dev.partenon.expositions.domain.SavePieceCommand;
import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
/**Maneja el comando del SavePieceResource*/
public class SavePieceCommandHandler implements CommandHandler<SavePieceCommand> {
    @Autowired
    private ExpositionRepository expositionRepository;
    @Autowired
    private PieceRepository repository;

    @Override
    public void handle(SavePieceCommand command) throws Exception {
        var exposition = expositionRepository.findByExpositionId(command.getExpositionId());
        if(exposition.isEmpty())
            throw new Exception("ID no registrado");

        repository.save(Pieces.create(command, exposition.get()));

    }
}
