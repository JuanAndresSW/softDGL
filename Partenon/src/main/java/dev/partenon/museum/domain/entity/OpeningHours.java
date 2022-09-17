package dev.partenon.museum.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.museum.domain.commands.SaveOpeningHoursCommand;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;


@Table(name = "opening_hours")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public final class OpeningHours implements Serializable {
    public static final Long serialVersionUID = 1L;

    @JsonIgnore
    @Id
    @Column(name = "opening_hours_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long openingHoursId;

    @JsonIgnore
    @JoinColumn(name = "museum_id", nullable = false)
    @OneToOne(cascade = {CascadeType.PERSIST,CascadeType.REMOVE, CascadeType.MERGE})
    private Museum museum;

    @Column(length = 35, nullable = false)
    private String monday;
    @Column(length = 35, nullable = false)
    private String tuesday;
    @Column(length = 35, nullable = false)
    private String wednesday;
    @Column(length = 35, nullable = false)
    private String thursday;
    @Column(length = 35, nullable = false)
    private String friday;
    @Column(length = 35, nullable = false)
    private String saturday;
    @Column(length = 35, nullable = false)
    private String sunday;

    public static OpeningHours create(SaveOpeningHoursCommand command, Museum museum){
        var opening = new OpeningHours();

        opening.setMonday(command.getMonday());
        opening.setTuesday(command.getTuesday());
        opening.setWednesday(command.getWednesday());
        opening.setThursday(command.getThursday());
        opening.setFriday(command.getFriday());
        opening.setSaturday(command.getSaturday());
        opening.setSunday(command.getSunday());
        opening.setMuseum(museum);

        return opening;
    }

    @Override
    public String toString() {
        return "OpeningHours{" +
                "openingHoursId=" + openingHoursId +
                ", monday='" + monday + '\'' +
                ", tuesday='" + tuesday + '\'' +
                ", wednesday='" + wednesday + '\'' +
                ", thursday='" + thursday + '\'' +
                ", friday='" + friday + '\'' +
                ", saturday='" + saturday + '\'' +
                ", sunday='" + sunday + '\'' +
                '}';
    }
}
