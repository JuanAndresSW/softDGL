package dev.partenon.museumcontext.appointment.domain;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
@Builder
public class AppointmentRestModel {
    @NotEmpty
    private String requestedName;
    @NotEmpty
    private String selectedTour;
    @NotEmpty
    private String language;
    @NotEmpty
    private String appointmentDate;
}
