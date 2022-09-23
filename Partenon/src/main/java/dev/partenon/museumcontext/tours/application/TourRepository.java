package dev.partenon.museumcontext.tours.application;

import dev.partenon.museumcontext.tours.domain.entity.MuseumTour;
import dev.partenon.museumcontext.tours.domain.entity.TourPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourRepository extends JpaRepository<MuseumTour, TourPK> {

    List<MuseumTour> findByTourPKMuseumId(Long museumId);
}
