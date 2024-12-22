package dev.partenon.user.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.partenon.global.domain.abstractcomponents.query.QueryBus;
import dev.partenon.user.domain.RefreshQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * EndPoint para refrescar los Tokens
 */
@RestController
@RequestMapping(path = "/api")
public class RefreshResource {
    @Autowired
    private final QueryBus queryBus;

    public RefreshResource(QueryBus queryBus) {
        this.queryBus = queryBus;
    }

    /**
     * Se llama cuando el {@code Access-Token} ha expirado
     * Crea un nuevo {@code Access-Token y Refresh-Token} con el {@code Refresh-Token} anterior
     *
     * @param request  {@link HttpServletRequest} de la API de HttpServlet. Maneja la request
     * @param response {@link HttpServletResponse} de la API HttpServlet. Marca la respuesta de la request
     */
    @GetMapping("/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String headerToken = request.getHeader(AUTHORIZATION);
        var query = RefreshQuery.builder()
                .headerToken(headerToken)
                .build();

        var tokens = queryBus.handle(query);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }


}
