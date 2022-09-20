package dev.partenon.museumcontext.core.infrastructure;

import dev.partenon.global.domain.abstractcomponents.query.QueryBus;
import dev.partenon.museumcontext.core.doamin.GetMuseumByNameQuery;
import dev.partenon.museumcontext.core.doamin.Museum;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/museums")
public class GetMuseumByNameResource {
    private final QueryBus queryBus;

    @Autowired
    public GetMuseumByNameResource(QueryBus queryBus) {
        this.queryBus = queryBus;
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<Museum>> getMuseum(@PathVariable("name") String name)
            throws Exception {
        log.info("Nombre is: {}", name);
        var query = GetMuseumByNameQuery.builder()
                .charactersNames(StringUtils.stripAccents(name))
                .build();
        var response = queryBus.handle(query);
        return ResponseEntity.ok(response);
    }
}
