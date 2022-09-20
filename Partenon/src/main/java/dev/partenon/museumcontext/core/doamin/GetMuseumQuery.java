package dev.partenon.museumcontext.core.doamin;

import dev.partenon.global.domain.abstractcomponents.query.Query;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetMuseumQuery extends Query<Museum> {
    private Long museumId;
}
