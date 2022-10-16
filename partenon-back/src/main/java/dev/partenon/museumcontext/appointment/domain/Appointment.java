package dev.partenon.museumcontext.appointment.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.museumcontext.core.doamin.Museum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Table(name = "appointment")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
/**Entidad cita*/
public class Appointment implements Serializable {
    public static final Long serialVersionUID = 1L;

    @Id
    @Column(name = "appointment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;
    @Column(name = "language", nullable = false, length = 20)
    private String language;
    @Column(name = "requested_name", nullable = false, length = 30)
    private String requestedName;
    @Column(name = "email", nullable = false, length = 30)
    private String email;
    @Column(name = "appointment_code", nullable = false, length = 30)
    private String appointmentCode;

    @JsonIgnore
    @JoinColumn(name = "museum_id", nullable = false)
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private Museum museum;


    public static Appointment create(SaveAppointmentCommand command, Museum museum, String code){
        var appointment = new Appointment();

        appointment.setRequestedName(command.getRequestedName());
        appointment.setEmail(command.getEmail());
        appointment.setLanguage(command.getLanguage());
        appointment.setAppointmentDate(LocalDate.parse(command.getAppointmentDate()));
        appointment.setAppointmentCode(code);
        appointment.setMuseum(museum);

        return appointment;
    }

}
