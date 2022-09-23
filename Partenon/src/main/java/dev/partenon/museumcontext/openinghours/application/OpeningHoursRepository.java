package dev.partenon.museumcontext.openinghours.application;

import dev.partenon.museumcontext.core.doamin.Museum;
import dev.partenon.museumcontext.openinghours.doamin.OpeningHours;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OpeningHoursRepository extends JpaRepository<OpeningHours, Long> {

    OpeningHours findByMuseum(Museum museum);
    Boolean existsByOpeningHoursId(Long id);
}
