package dev.partenon.museum.domain.model;

import lombok.*;

@ToString
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Data
public class MuseumProjection {
    private final String museumBannerBanner;
    private final String museumName;
    private final String museumDescriptionDescription;
}
