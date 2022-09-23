package dev.partenon.museumcontext.core.doamin.models;

import lombok.*;

@ToString
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Data
public class MuseumProjection {
    private String museumId;
    private String name;
    private String banner;
    private String description;

    public MuseumProjection(Long museumId, String name){
        this.museumId = String.valueOf(museumId);
        this.name = name;
    }
}
