package dev.partenon.museumcontext.core.infrastructure;

import dev.partenon.global.domain.abstractcomponents.query.QueryBus;
import dev.partenon.museumcontext.core.doamin.query.GetMuseumQuery;
import dev.partenon.museumcontext.core.doamin.Museum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/museums")
public class GetMuseumResource {
    private final QueryBus queryBus;

    @Autowired
    public GetMuseumResource(QueryBus queryBus) {
        this.queryBus = queryBus;
    }

    @GetMapping
    public HttpEntity<Museum> getMuseum(
            @RequestParam(value = "key") String museumId)
            throws Exception {
        var query = GetMuseumQuery.builder()
                .museumId(Long.valueOf(museumId)).build();
        var response = queryBus.handle(query);

        return ResponseEntity.ok(response);
    }
}
