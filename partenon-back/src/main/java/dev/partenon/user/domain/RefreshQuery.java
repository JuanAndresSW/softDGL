package dev.partenon.user.domain;

import dev.partenon.global.domain.abstractcomponents.query.Query;
import dev.partenon.user.domain.model.TokenUpdated;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RefreshQuery extends Query<TokenUpdated> {
    private String headerToken;
}
