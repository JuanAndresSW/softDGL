package dev.partenon.museum.application.repository;

import dev.partenon.museum.domain.entity.MuseumContact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<MuseumContact, Long> {
}
