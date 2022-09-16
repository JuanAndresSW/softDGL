package dev.partenon.museum.application.repository;

import dev.partenon.museum.domain.entity.Museum;
import dev.partenon.museum.domain.model.MuseumProjection;
import dev.partenon.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface MuseumRepository extends JpaRepository<Museum, Long> {
    Optional<Museum> findByMuseumId(Long museumId);
    Optional<Museum> findByUserUsernameOrUserEmail(String username, String email);
}
