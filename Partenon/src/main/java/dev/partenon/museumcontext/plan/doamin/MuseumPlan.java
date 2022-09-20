package dev.partenon.museumcontext.plan.doamin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.museumcontext.core.doamin.Museum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "museum_plan")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MuseumPlan implements Serializable {
    public static final Long serialVersionUID = 1L;

    @Id
    @Column(name = "museum_plan_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;

    @JsonIgnore
    @JoinColumn(name = "museum_id", nullable = false)
    @OneToOne(cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private Museum museum;

    @Lob
    @Column(name = "museum_building_plan", nullable = false)
    private String buildingPlan;

    public static MuseumPlan create(SaveBuildingPlanCommand command, Museum museum){
        var museumPlan = new MuseumPlan();
        museumPlan.setBuildingPlan(command.getBuildingPlan());
        museumPlan.setMuseum(museum);
        return museumPlan;
    }

    @Override
    public String toString() {
        return "MuseumPlan{" +
                "museumPlanId=" + planId +
                ", buildingPlan='" + buildingPlan + '\'' +
                '}';
    }
}
