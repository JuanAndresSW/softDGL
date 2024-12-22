package dev.partenon.user.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.partenon.global.domain.abstractcomponents.query.QueryBus;
import dev.partenon.user.domain.InitQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/auth")
public class InitResource {
    @Autowired
   private QueryBus queryBus;

    /**
     * Sirve para recuperar el ID en caso de que la sesion se vuelva a iniciar
     * Verifica que el token no haya expirado
     *
     * @param request  {@link HttpServletRequest} de la API de HttpServlet. Maneja la request
     * @param response {@link HttpServletResponse} de la API HttpServlet. Marca la respuesta de la request
     * @throws IOException
     */
    @GetMapping("/init")
    public void initApp(HttpServletRequest request, HttpServletResponse response) throws Exception {
        var query = InitQuery.builder()
                .authToken(request.getHeader(AUTHORIZATION))
                .build();

        var museumId = queryBus.handle(query);

        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_OK);
        new ObjectMapper().writeValue(response.getOutputStream(), museumId);
    }


}
