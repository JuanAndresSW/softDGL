package dev.partenon.museumcontext.contact.infrastructure;

import dev.partenon.global.domain.abstractcomponents.command.CommandBus;
import dev.partenon.museumcontext.contact.doamin.SaveContactCommand;
import dev.partenon.museumcontext.contact.doamin.ContactRestModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotEmpty;
import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/api/museums")
/**Endpoint para guardar contacto del museo. Funciona como update*/
public class SaveContactResource {
    private final CommandBus commandBus;

    @Autowired
    public SaveContactResource(CommandBus commandBus){
        this.commandBus = commandBus;
    }

    /**
     *
     * @param contactRestModel Contacto del museo a guardar
     * @param museumId ID del museo
     * @return
     * @throws Exception
     */
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/contacts")
    public HttpEntity<Void> saveContact(@RequestBody @NotEmpty ContactRestModel contactRestModel,
                                        @RequestParam("key") String museumId) throws Exception{
        var command = SaveContactCommand.builder()
                .contact(contactRestModel.getContact())
                .type(contactRestModel.getType())
                .museumId(Long.valueOf(museumId))
                .flag(true)
                .build();

        commandBus.handle(command);

        //Comprueba si es update o create
        if(command.getFlag())
            return ResponseEntity.created(new URI("http://localhost:8080/api/museums/contacts&key=".concat(museumId))).build();

        return ResponseEntity.noContent().build();
    }
}
