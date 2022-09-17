package dev.partenon.museum.domain;

import dev.partenon.global.domain.abstractcomponents.query.Query;
import dev.partenon.global.domain.model.Page;
import dev.partenon.global.domain.model.PagedResponse;
import dev.partenon.museum.domain.entity.Museum;
import dev.partenon.museum.domain.model.MuseumProjection;
import lombok.Data;

@Data
public class PagingMuseumsQuery extends Query<PagedResponse<Museum>> {
    private final Page page;

    /**
     * Builder de la Query
     */
    public static class Builder {
        private Page page;

        public static PagingMuseumsQuery.Builder getInstance() {
            return new PagingMuseumsQuery.Builder();
        }

        public PagingMuseumsQuery.Builder page(Page page) {
            this.page = page;
            return this;
        }

        public PagingMuseumsQuery build() {
            return new PagingMuseumsQuery(page);
        }
    }
}
