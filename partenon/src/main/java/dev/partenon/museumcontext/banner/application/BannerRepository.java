package dev.partenon.museumcontext.banner.application;

import dev.partenon.museumcontext.banner.doamin.MuseumBanner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepository extends JpaRepository<MuseumBanner, Long> {

}
