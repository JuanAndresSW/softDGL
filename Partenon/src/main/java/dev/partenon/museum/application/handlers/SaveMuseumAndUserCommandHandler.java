package dev.partenon.museum.application.handlers;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museum.application.repository.MuseumRepository;
import dev.partenon.museum.domain.entity.Museum;
import dev.partenon.museum.domain.commands.SaveMuseumAndUserCommand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@Transactional
public class SaveMuseumAndUserCommandHandler implements CommandHandler<SaveMuseumAndUserCommand> {
    @Autowired
    private MuseumRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public void handle(SaveMuseumAndUserCommand command) throws Exception {
        this.verifyIndexs(command);

        var museum = Museum.create(command, passwordEncoder);
        repository.save(museum);
    }

    private void verifyIndexs(SaveMuseumAndUserCommand command) throws Exception {
        var userWithUsername = repository.findByUserUsernameOrUserEmail
                (command.getUsername(), command.getUsername());
        if (!userWithUsername.isEmpty())
            throw new Exception("Username ya se encuentra en uso");

        var userWithEmail = repository.findByUserUsernameOrUserEmail
                (command.getEmail(), command.getEmail());
        if (!userWithEmail.isEmpty())
            throw new Exception("email ya se encuentra en uso");

    }
}
