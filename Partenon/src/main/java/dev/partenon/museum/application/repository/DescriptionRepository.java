package dev.partenon.museum.application.repository;

import dev.partenon.museum.domain.entity.MuseumDescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DescriptionRepository extends JpaRepository<MuseumDescription, Long> {
}
