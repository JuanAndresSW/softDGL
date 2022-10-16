package dev.partenon.museumcontext.core.application;

import dev.partenon.museumcontext.core.doamin.Museum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MuseumRepository extends JpaRepository<Museum, Long> {
    /**Busca un museo por ID*/
    Optional<Museum> findByMuseumId(Long museumId);
    /**Busca un museo por username o email*/
    Optional<Museum> findByUserUsernameOrUserEmail(String username, String email);
    Boolean existsByMuseumId(Long museumId);

    /**Pagina los museos segun el nombre que le pases*/
    @Query("SELECT m FROM Museum m WHERE " +
            "LOWER(m.museumName) LIKE LOWER(CONCAT('%',:termName,'%'))")
    Page<Museum> searchByName(@Param("termName") String termName, Pageable pageable);
}
