package dev.partenon.expositions.infrastructure;

import dev.partenon.expositions.domain.Expositions;
import dev.partenon.expositions.domain.PagingExpositionsQuery;
import dev.partenon.expositions.domain.SaveExpositionCommand;
import dev.partenon.expositions.domain.model.ExpositionRestModel;
import dev.partenon.global.domain.abstractcomponents.command.CommandBus;
import dev.partenon.global.domain.abstractcomponents.query.QueryBus;
import dev.partenon.global.domain.model.Page;
import dev.partenon.global.domain.model.PagedResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/")
public class ListExpositionResource {
    private final QueryBus queryBus;

    @Autowired
    public ListExpositionResource(QueryBus queryBus){
        this.queryBus = queryBus;
    }

    @GetMapping("/by")
    public ResponseEntity<PagedResponse<Expositions>> saveBanners(
            @RequestParam(value = "index") int index,
            @RequestParam(value = "size") int size,
            @RequestParam(value = "sort") String sort,
            @RequestParam(value = "order") String order,
            @RequestParam("key") String museumId) throws Exception {
        var query = PagingExpositionsQuery.Builder.getInstance()
                .museumId(museumId)
                .page(Page.starter(index, size, sort, order))
                .build();

        var response = queryBus.handle(query);

        return ResponseEntity.ok(response);
    }
}
