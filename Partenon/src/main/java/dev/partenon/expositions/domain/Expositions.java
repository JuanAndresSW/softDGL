package dev.partenon.expositions.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.museum.domain.entity.Museum;
import lombok.*;

import javax.persistence.*;

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
    @Lob
    @Column(name = "photo", nullable = false)
    private String photo;
    @Column(name = "category", nullable = false)
    private String category;

    @JsonIgnore
    @JoinColumn(name = "museum_id", nullable = false)
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private Museum museumOwnerExposition;

    public static Expositions create(SaveExpositionCommand command, Museum museum){
        var exposition = new Expositions();
        exposition.setExpositionName(command.getName());
        exposition.setDescription(command.getDescription());
        exposition.setPhoto(command.getPhoto());
        exposition.setMuseumOwnerExposition(museum);
        exposition.setCategory(command.getCategory());
        return exposition;
    }

    @Override
    public String toString() {
        return "Expositions{" +
                "expositionId=" + expositionId +
                ", expositionName='" + expositionName + '\'' +
                ", description='" + description + '\'' +
                ", photo='" + photo + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
