package dev.partenon.museumcontext.tours.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@Getter
@Setter
/**Clave primaria de la entidad Tour*/
public class TourPK implements Serializable {
    public static final Long serialVersionUID = 1L;

    @JsonIgnore
    @Column(name = "museum_id", nullable = false)
    protected Long museumId;
    @Column(name = "tour_name", nullable = false, length = 30)
    protected String tourName;

    public TourPK(Long museumId, String tourName) {
        super();
        this.museumId = museumId;
        this.tourName = tourName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        TourPK tourPK = (TourPK) o;

        return new EqualsBuilder().append(museumId, tourPK.museumId).append(tourName, tourPK.tourName).isEquals();
    }
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(museumId).append(tourName).toHashCode();
    }
}
