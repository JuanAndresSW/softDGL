package dev.partenon.museum.domain.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class BuildingPlanRestModel {
    @JsonProperty("buildingPlan")
    @NotNull
    private String buildingPlan;
}
