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
    @Column(name = "selected_tour", nullable = false, length = 30)
    private String selectedTour;

    @JsonIgnore
    @JoinColumn(name = "museum_id", nullable = false)
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private Museum museum;


    public static Appointment create(SaveAppointmentCommand command, Museum museum){
        var shifts = new Appointment();

        shifts.setRequestedName(command.getRequestedName());
        shifts.setSelectedTour(command.getSelectedTour());
        shifts.setLanguage(command.getLanguage());
        shifts.setAppointmentDate(LocalDate.parse(command.getIssueDate()));
        shifts.setMuseum(museum);

        return shifts;
    }

}
