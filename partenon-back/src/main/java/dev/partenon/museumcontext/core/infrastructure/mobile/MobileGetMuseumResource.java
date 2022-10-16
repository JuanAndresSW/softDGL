package dev.partenon.museumcontext.core.infrastructure.mobile;

import dev.partenon.global.domain.abstractcomponents.query.QueryBus;
import dev.partenon.museumcontext.core.doamin.Museum;
import dev.partenon.museumcontext.core.doamin.models.MobilMuseumProjection;
import dev.partenon.museumcontext.core.doamin.query.GetQuery;
import dev.partenon.museumcontext.core.doamin.query.MobileGetQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mobil/museums")
/**Endpoint para Mobil, Recuperar un museo*/
public class MobileGetMuseumResource {
    private final QueryBus queryBus;

    @Autowired
    public MobileGetMuseumResource(QueryBus queryBus) {
        this.queryBus = queryBus;
    }

    /**
     *
     * @param museumId ID del museo a recuperar
     * @return
     * @throws Exception
     */
    @GetMapping
    public HttpEntity<MobilMuseumProjection> getMuseumMobile(
            @RequestParam(value = "key") String museumId)
            throws Exception {
        var query = MobileGetQuery.builder()
                .museumId(Long.parseLong(museumId))
                .build();

        var response = queryBus.handle(query);

        return ResponseEntity.ok(response);
    }
}
