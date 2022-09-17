package dev.partenon.expositions.application;

import dev.partenon.expositions.domain.Expositions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpositionRepository extends JpaRepository<Expositions, Long> {
}
