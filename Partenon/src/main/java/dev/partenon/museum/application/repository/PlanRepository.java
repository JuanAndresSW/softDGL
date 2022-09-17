package dev.partenon.museum.application.repository;

import dev.partenon.museum.domain.entity.MuseumPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<MuseumPlan, Long> {
    Boolean existsByMuseumPlanId(Long id);
}
