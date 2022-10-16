package dev.partenon.expositions.infrastructure;

import dev.partenon.expositions.domain.SaveExpositionCommand;
import dev.partenon.expositions.domain.SavePieceCommand;
import dev.partenon.expositions.domain.model.ExpositionRestModel;
import dev.partenon.expositions.domain.model.PieceRestModel;
import dev.partenon.global.domain.abstractcomponents.command.CommandBus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/pieces")
public class SavePieceResource {
    private final CommandBus commandBus;

    @Autowired
    public SavePieceResource(CommandBus commandBus){
        this.commandBus = commandBus;
    }

    /**
     *
     * @param pieceRestModel Modelo rest con los datos para crear una pieza
     * @return
     * @throws Exception
     */
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public HttpEntity<Void> savePiece(@RequestBody @Valid PieceRestModel pieceRestModel) throws Exception {

        var command = SavePieceCommand.builder()
                .pieceName(pieceRestModel.getPieceName())
                .description(pieceRestModel.getDescription())
                .photo(pieceRestModel.getPhoto())
                .expositionId(pieceRestModel.getExpositionId())
                .build();

        commandBus.handle(command);

        return ResponseEntity.created(
                        new URI("http://localhost:8080/api/expositions&key=".concat(String.valueOf(pieceRestModel.getExpositionId()))))
                .build();
    }
}
