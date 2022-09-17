package dev.partenon.museum.domain;

import dev.partenon.global.domain.abstractcomponents.query.Query;
import dev.partenon.museum.domain.entity.Museum;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetMuseumQuery extends Query<Museum> {
    private Long museumId;
}
