package dev.partenon.museum.domain.entity;

import dev.partenon.museum.domain.commands.SaveDescriptionCommand;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "museum_description")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public final class MuseumDescription {
    @Id
    @Column(name = "museum_description_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long museumDescriptionId;

    @Column(name = "description", nullable = false, length = 200)
    private String description;

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
                "museumDescriptionId=" + museumDescriptionId +
                ", museumDescription='" + description + '\'' +
                '}';
    }
}
