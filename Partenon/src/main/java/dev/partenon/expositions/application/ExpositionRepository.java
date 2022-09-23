package dev.partenon.expositions.application;

import dev.partenon.expositions.domain.Expositions;
import dev.partenon.museumcontext.core.doamin.Museum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpositionRepository extends JpaRepository<Expositions, Long> {
    Page<Expositions> findByMuseumOwnerExposition(Museum museum, Pageable pageable);
}
