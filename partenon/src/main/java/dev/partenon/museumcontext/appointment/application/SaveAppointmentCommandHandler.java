package dev.partenon.museumcontext.appointment.application;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.appointment.domain.Appointment;
import dev.partenon.museumcontext.appointment.domain.SaveAppointmentCommand;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class SaveAppointmentCommandHandler implements CommandHandler<SaveAppointmentCommand> {
    @Autowired
    private AppointmentRepository repository;
    @Autowired
    private MuseumRepository museumRepository;

    @Override
    public void handle(SaveAppointmentCommand command) throws Exception {
        var museum = museumRepository.findByMuseumId(command.getMuseumId());
        if(museum.isEmpty())
            throw new Exception("ID no registrado");

        repository.save(Appointment.create(command, museum.get()));
    }
}
