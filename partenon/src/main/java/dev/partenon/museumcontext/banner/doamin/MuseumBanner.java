package dev.partenon.museumcontext.banner.doamin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.museumcontext.core.doamin.Museum;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "museum_banner")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MuseumBanner implements Serializable {
    public static final Long serialVersionUID = 1L;

    @JsonIgnore
    @Id
    @Column(name = "museum_banner_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bannerId;

    @JsonIgnore
    @JoinColumn(name = "museum_id", nullable = false)
    @OneToOne(cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private Museum museum;

    @Lob
    @Column(name = "museum_banner", nullable = false)
    private String banner;

    public static MuseumBanner create(String banner, Museum museum){
        var museumBanner = new MuseumBanner();

        museumBanner.setBanner(banner);
        museumBanner.setMuseum(museum);

        return museumBanner;
    }

    @Override
    public String toString() {
        return "MuseumBanner{" +
                "museumBannerId=" + bannerId +
                ", banner='" + banner + '\'' +
                '}';
    }
}
