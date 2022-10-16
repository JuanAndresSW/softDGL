package dev.partenon.museumcontext.description.doamin;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DescriptionModel {
    @JsonProperty("description")
    @Lob
    @NotNull
    private String description;
}
