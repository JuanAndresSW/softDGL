package dev.partenon.museumcontext.core.infrastructure;

import dev.partenon.global.domain.abstractcomponents.command.CommandBus;
import dev.partenon.museumcontext.core.doamin.SaveMuseumAndUserCommand;
import dev.partenon.user.domain.model.UserRestModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class SaveMuseumAndUserResource {
    @Autowired
    private CommandBus commandBus;

    @PostMapping("/museums")
    public HttpEntity<Void> create(@RequestBody @Valid UserRestModel userRestModel) throws Exception {

        var command = SaveMuseumAndUserCommand.builder()
                .username(userRestModel.getUsername())
                .password(userRestModel.getPassword())
                .email(userRestModel.getEmail())
                .museumName(userRestModel.getMuseumName())
                .province(userRestModel.getProvince())
                .city(userRestModel.getCity())
                .street(userRestModel.getStreet())
                .addressNumber(userRestModel.getAddressNumber())
                .build();
        commandBus.handle(command);
        return ResponseEntity.created(new URI("http://localhost:8080/api/auth/museums")).build();
    }
}
