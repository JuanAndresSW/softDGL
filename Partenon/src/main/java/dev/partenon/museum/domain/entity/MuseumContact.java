package dev.partenon.museum.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.museum.domain.SocialMediaType;
import dev.partenon.museum.domain.commands.SaveContactCommand;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Table(name = "museum_contact")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MuseumContact implements Serializable {
    public static final Long serialVersionUID = 1L;

    @Id
    @Column(name = "museum_contact_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long museumContactId;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "type", nullable = false,
            columnDefinition = "enum('TWITTER', 'FACEBOOK', 'WSP', 'EMAIL', 'INSTAGRAM')")
    private SocialMediaType type;

    @Column(name = "museum_contact", nullable = false)
    private String museumContact;

    @JsonIgnore
    @JoinColumn(name = "museum_id", nullable = false)
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private Museum museum;

    public static MuseumContact create(SaveContactCommand command, Museum museum){
        var museumContact = new MuseumContact();
        museumContact.setType(SocialMediaType.valueOf(command.getType()));
        museumContact.setMuseumContact(command.getContact());
        museumContact.setMuseum(museum);
        return museumContact;
    }

    @Override
    public String toString() {
        return "MuseumContact{" +
                "museumContactId=" + museumContactId +
                ", type=" + type +
                ", museumContact='" + museumContact + '\'' +
                '}';
    }
}

