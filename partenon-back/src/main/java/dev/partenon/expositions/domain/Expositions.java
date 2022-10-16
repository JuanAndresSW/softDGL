package dev.partenon.expositions.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.museumcontext.core.doamin.Museum;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "expositions")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Expositions {
    @Id
    @Column(name = "exposition_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expositionId;

    @Column(name = "exposition_name", nullable = false, length = 30)
    private String expositionName;
    @Column(name = "description", nullable = false, length = 200)
    private String description;
    @Column(name = "category", nullable = false, length = 45)
    private String category;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @JsonIgnore
    @JoinColumn(name = "museum_id", nullable = false)
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private Museum museumOwnerExposition;

    public static Expositions create(SaveExpositionCommand command, Museum museum){
        var exposition = new Expositions();
        exposition.setExpositionName(command.getName());
        exposition.setDescription(command.getDescription());
        exposition.setMuseumOwnerExposition(museum);
        exposition.setCategory(command.getCategory());
        exposition.setStartDate(LocalDate.now());
        exposition.setEndDate(LocalDate.parse(command.getEndDate()));
        return exposition;
    }

    @Override
    public String toString() {
        return "Expositions{" +
                "expositionId=" + expositionId +
                ", expositionName='" + expositionName + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
