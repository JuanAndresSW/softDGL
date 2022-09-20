package dev.partenon.museumcontext.description.application;

import dev.partenon.museumcontext.description.doamin.MuseumDescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DescriptionRepository extends JpaRepository<MuseumDescription, Long> {
}
