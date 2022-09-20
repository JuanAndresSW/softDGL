package dev.partenon.museumcontext.core.doamin;

import dev.partenon.global.domain.abstractcomponents.query.Query;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetMuseumByNameQuery extends Query<List<Museum>> {
    private String charactersNames;
}
