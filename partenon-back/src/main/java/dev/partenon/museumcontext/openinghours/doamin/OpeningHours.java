package dev.partenon.museumcontext.openinghours.doamin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.museumcontext.core.doamin.Museum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import java.io.Serializable;


@Table(name = "opening_hours")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
/**Entidad Horario de Apertura*/
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

    public static OpeningHours create(UpdateOpeningHoursCommand opening, OpeningHours currentOpening){
        if(StringUtils.hasText(opening.getMonday()))
            currentOpening.setMonday(opening.getMonday());
        if(StringUtils.hasText(opening.getTuesday()))
            currentOpening.setTuesday(opening.getTuesday());
        if(StringUtils.hasText(opening.getWednesday()))
            currentOpening.setWednesday(opening.getWednesday());
        if(StringUtils.hasText(opening.getThursday()))
            currentOpening.setThursday(opening.getThursday());
        if(StringUtils.hasText(opening.getFriday()))
            currentOpening.setFriday(opening.getFriday());
        if(StringUtils.hasText(opening.getSaturday()))
            currentOpening.setSaturday(opening.getSaturday());
        if(StringUtils.hasText(opening.getSunday()))
            currentOpening.setSunday(opening.getSunday());
        return currentOpening;
    }
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
