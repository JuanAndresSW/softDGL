package dev.partenon.museumcontext.description.doamin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.museumcontext.core.doamin.Museum;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "museum_description")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public final class MuseumDescription implements Serializable {
    public static final Long serialVersionUID = 1L;

    @Id
    @Column(name = "museum_description_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long descriptionId;

    @Column(name = "description", nullable = false, length = 300)
    private String description;

    @JsonIgnore
    @JoinColumn(name = "museum_id", nullable = false, unique = true)
    @OneToOne(cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private Museum museum;

    public static MuseumDescription create(SaveDescriptionCommand command, Museum museum){
        var museumDescription = new MuseumDescription();
        museumDescription.setDescription(command.getDescription());
        museumDescription.setMuseum(museum);
        return museumDescription;
    }

    @Override
    public String toString() {
        return "MuseumDescription{" +
                "museumDescriptionId=" + descriptionId +
                ", museumDescription='" + description + '\'' +
                '}';
    }
}
