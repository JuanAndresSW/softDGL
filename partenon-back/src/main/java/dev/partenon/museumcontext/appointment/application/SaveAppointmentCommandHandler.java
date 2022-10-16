package dev.partenon.museumcontext.appointment.application;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.global.domain.abstractcomponents.event.EventBus;
import dev.partenon.museumcontext.appointment.domain.SendEmailEvent;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.appointment.domain.Appointment;
import dev.partenon.museumcontext.appointment.domain.SaveAppointmentCommand;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@AllArgsConstructor
@Service
/**Maneja el comando de SaveAppointmentResource*/
public class SaveAppointmentCommandHandler implements CommandHandler<SaveAppointmentCommand> {
    @Autowired
    private AppointmentRepository repository;
    @Autowired
    private MuseumRepository museumRepository;
    @Autowired
    private EventBus eventBus;

    @Override
    public void handle(SaveAppointmentCommand command) throws Exception {
        var museum = museumRepository.findByMuseumId(command.getMuseumId());
        if(museum.isEmpty())
            throw new Exception("ID no registrado");

        var code = UUID.randomUUID().toString();
        code = code.split("-")[0];
        while (repository.existsByAppointmentCode(code)) {
            code = UUID.randomUUID().toString();
            code = code.split("-")[0];
        }
        var event = SendEmailEvent.builder()
                        .email(command.getEmail())
                        .appointmentDate(command.getAppointmentDate())
                        .code(code)
                        .subject("Reservacion de Turno ".concat(code))
                        .requestedName(command.getRequestedName())
                        .museumName(museum.get().getMuseumName())
                .build();

        var response = eventBus.handle(event);

        if(!response)
            throw new Exception("El email no es valido");

        repository.save(Appointment.create(command, museum.get(), code));
    }
}
