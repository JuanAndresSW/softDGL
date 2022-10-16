package dev.partenon.expositions.application;

import dev.partenon.expositions.domain.Pieces;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PieceRepository extends JpaRepository<Pieces, Long> {
}
