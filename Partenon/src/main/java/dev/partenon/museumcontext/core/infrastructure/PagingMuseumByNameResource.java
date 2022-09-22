package dev.partenon.museumcontext.core.infrastructure;

import dev.partenon.global.domain.abstractcomponents.query.QueryBus;
import dev.partenon.global.domain.model.Page;
import dev.partenon.global.domain.model.PagedResponse;
import dev.partenon.museumcontext.core.doamin.models.MuseumProjection;
import dev.partenon.museumcontext.core.doamin.query.GetMuseumByNameQuery;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/museums")
public class PagingMuseumByNameResource {
    private final QueryBus queryBus;

    @Autowired
    public PagingMuseumByNameResource(QueryBus queryBus) {
        this.queryBus = queryBus;
    }

    @GetMapping("/{name}")
    public HttpEntity<PagedResponse<MuseumProjection>> getMuseum(
            @RequestParam(value = "index") int index,
            @RequestParam(value = "size") int size,
            @RequestParam(value = "sort") String sort,
            @RequestParam(value = "order") String order,
            @PathVariable("name") String name)
            throws Exception {
        var query = GetMuseumByNameQuery.builder()
                .charactersNames(StringUtils.stripAccents(name))
                .page(Page.starter(index, size, sort, order))
                .build();
        var response = queryBus.handle(query);
        return ResponseEntity.ok(response);
    }
}
