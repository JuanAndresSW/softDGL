package dev.partenon.museumcontext.appointment.domain;

import dev.partenon.global.domain.abstractcomponents.command.Command;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SaveAppointmentCommand extends Command {
    private String requestedName;
    private String selectedTour;
    private String language;
    private String issueDate;
    private Long museumId;
}
