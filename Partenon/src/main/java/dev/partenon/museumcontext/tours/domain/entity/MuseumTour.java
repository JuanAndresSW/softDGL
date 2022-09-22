package dev.partenon.museumcontext.tours.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.museumcontext.core.doamin.Museum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "museum_tour")
@Entity
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MuseumTour implements Serializable {
    public static final Long serialVersionUID = 1L;

    @EmbeddedId
    private TourPK tourPK;

    @JsonIgnore
    @JoinColumn(name = "museum_id", referencedColumnName = "museum_id", updatable = false, insertable = false)
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Museum museum;

    public MuseumTour(Long museumId, String tourName) {
        super();
        this.tourPK = new TourPK(museumId, tourName);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        MuseumTour that = (MuseumTour) o;

        return new EqualsBuilder().append(tourPK, that.tourPK).append(museum, that.museum).isEquals();
    }
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(tourPK).append(museum).toHashCode();
    }
}
