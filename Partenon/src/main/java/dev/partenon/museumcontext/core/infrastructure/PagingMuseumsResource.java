package dev.partenon.museumcontext.core.infrastructure;

import dev.partenon.global.domain.abstractcomponents.query.QueryBus;
import dev.partenon.global.domain.model.Page;
import dev.partenon.global.domain.model.PagedResponse;
import dev.partenon.museumcontext.core.doamin.PagingMuseumsQuery;
import dev.partenon.museumcontext.core.doamin.models.MuseumProjection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/museums")
public class PagingMuseumsResource {
    private final QueryBus queryBus;

    @Autowired
    public PagingMuseumsResource(QueryBus queryBus) {
        this.queryBus = queryBus;
    }

    /**
     *
     * @param index    Número de la página que se está pidiendo
     * @param size     Tamaño de la pagina
     * @param sort     Nombre del atributo sobre el que estarán ordenados los elementos
     * @param order    Decide si el orden debe ser ASC(Ascendente) o DESC(Descendente)
     * @return Devuelve el objeto {@link PagedResponse} con los datos de paginacion
     */

    @GetMapping("/all")
    public HttpEntity<PagedResponse<MuseumProjection>> getMuseumsList(
            @RequestParam(value = "index") int index,
            @RequestParam(value = "size") int size,
            @RequestParam(value = "sort") String sort,
            @RequestParam(value = "order") String order) throws Exception {

        var query = PagingMuseumsQuery.Builder.getInstance()
                .page(Page.starter(index, size, sort, order))
                .build();
        var response = queryBus.handle(query);

        return ResponseEntity.ok().body(response);
    }
}
