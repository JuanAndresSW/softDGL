package dev.partenon.museumcontext.contact.application;

import dev.partenon.museumcontext.contact.doamin.entity.MuseumContact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<MuseumContact, Long> {
}
