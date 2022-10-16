package dev.partenon.museumcontext.openinghours.application;

import dev.partenon.museumcontext.core.doamin.Museum;
import dev.partenon.museumcontext.openinghours.doamin.OpeningHours;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OpeningHoursRepository extends JpaRepository<OpeningHours, Long> {

    /**Busca un horario de apertura con un museo*/
    OpeningHours findByMuseum(Museum museum);
    /**Comprueba que el horario de apertura xista*/
    Boolean existsByOpeningHoursId(Long id);
}
