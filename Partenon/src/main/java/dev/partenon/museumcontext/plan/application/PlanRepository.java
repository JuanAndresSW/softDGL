package dev.partenon.museumcontext.plan.application;

import dev.partenon.museumcontext.plan.doamin.MuseumPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<MuseumPlan, Long> {
    Boolean existsByPlanId(Long id);
}
