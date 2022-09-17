package dev.partenon.museum.infrastructure.read;

import dev.partenon.global.domain.abstractcomponents.query.QueryBus;
import dev.partenon.museum.domain.GetMuseumQuery;
import dev.partenon.museum.domain.entity.Museum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public ResponseEntity<Museum> getMuseum(
            @RequestParam(value = "key") String museumId)
            throws Exception {
        var query = GetMuseumQuery.builder()
                .museumId(Long.valueOf(museumId)).build();
        var response = queryBus.handle(query);

        return ResponseEntity.ok(response);
    }
}
