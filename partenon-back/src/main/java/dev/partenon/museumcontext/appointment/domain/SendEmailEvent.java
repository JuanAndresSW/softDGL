package dev.partenon.museumcontext.appointment.domain;

import dev.partenon.global.domain.abstractcomponents.event.Event;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@Builder
public class SendEmailEvent extends Event<Boolean> {
    @Email
    private String email;
    @NotEmpty
    private String subject;
    private String museumName;
    private String requestedName;
    private String code;
    private String appointmentDate;
}
