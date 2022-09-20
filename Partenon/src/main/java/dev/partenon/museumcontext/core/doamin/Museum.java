package dev.partenon.museumcontext.core.doamin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.expositions.domain.Expositions;
import dev.partenon.museumcontext.banner.doamin.MuseumBanner;
import dev.partenon.museumcontext.contact.doamin.MuseumContact;
import dev.partenon.museumcontext.description.doamin.MuseumDescription;
import dev.partenon.museumcontext.openinghours.doamin.OpeningHours;
import dev.partenon.museumcontext.plan.doamin.MuseumPlan;
import dev.partenon.user.domain.User;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Table(name = "museum")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public final class Museum implements Serializable {
    public static final Long serialVersionUID = 1L;

    @Id
    @Column(name = "museum_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long museumId;

    @Column(name = "museum_name", nullable = false, length = 30)
    private String museumName;

    @Column(name = "province", nullable = false, length = 30)
    private String province;

    @Column(name = "city", nullable = false, length = 30)
    private String city;

    @Column(name = "street", nullable = false, length = 30)
    private String street;

    @Column(name = "height", nullable = false, length = 4)
    private String addressNumber;

    @JsonIgnore
    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST},orphanRemoval = true)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @OneToOne(mappedBy = "museum", cascade = {CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private OpeningHours openingHours;

    @OneToMany(mappedBy = "museum", cascade = {CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private List<MuseumContact> museumContacts;

    @OneToMany(mappedBy = "museumOwnerExposition", cascade = {CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private List<Expositions> expositions;

    @OneToOne(mappedBy = "museum", cascade = {CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private MuseumPlan museumPlan;

    @OneToOne(mappedBy = "museum", cascade = {CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private MuseumBanner museumBanner;

    @OneToOne(mappedBy = "museum", cascade = {CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private MuseumDescription museumDescription;

    public Museum(Long museumId) {
        this.museumId = museumId;
    }

    public static Museum create(SaveMuseumAndUserCommand command, PasswordEncoder passwordEncoder){
        var museum = new Museum();
        museum.setMuseumName(command.getMuseumName());
        museum.setProvince(command.getProvince());
        museum.setCity(command.getCity());
        museum.setStreet(command.getStreet());
        museum.setAddressNumber(command.getAddressNumber());

        var user = new User();
        user.setEmail(command.getEmail());
        String password = passwordEncoder.encode(command.getPassword());
        user.setPassword(password);
        user.setUsername(command.getUsername());
        museum.setUser(user);

        return museum;
    }

    @Override
    public String toString() {
        return "Museum{" +
                "museumName='" + museumName + '\'' +
                ", province='" + province + '\'' +
                ", city='" + city + '\'' +
                ", street='" + street + '\'' +
                ", addressNumber='" + addressNumber + '\'' +
                ", openingHours=" + openingHours +
                ", museumContacts=" + museumContacts +
                ", expositions=" + expositions +
                ", museumPlan=" + museumPlan +
                ", museumBanner=" + museumBanner +
                ", museumDescription=" + museumDescription +
                '}';
    }
}
