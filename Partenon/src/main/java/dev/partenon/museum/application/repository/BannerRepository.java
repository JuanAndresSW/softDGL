package dev.partenon.museum.application.repository;

import dev.partenon.museum.domain.entity.MuseumBanner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepository extends JpaRepository<MuseumBanner, Long> {

}
