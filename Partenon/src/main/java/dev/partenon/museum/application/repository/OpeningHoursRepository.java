package dev.partenon.museum.application.repository;

import dev.partenon.museum.domain.entity.OpeningHours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface OpeningHoursRepository extends JpaRepository<OpeningHours, Long> {

    Boolean existsByOpeningHoursId(Long id);
}
