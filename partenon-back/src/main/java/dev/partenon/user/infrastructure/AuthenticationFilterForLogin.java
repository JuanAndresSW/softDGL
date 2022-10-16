package dev.partenon.user.infrastructure;

import dev.partenon.global.domain.model.CustomUserDetails;
import dev.partenon.global.infrastructure.security.JWTProvider;
import dev.partenon.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**Esta clase hace de filtro para la autenticacion*/
@RequiredArgsConstructor
public class AuthenticationFilterForLogin extends UsernamePasswordAuthenticationFilter {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTProvider jwt;

    public AuthenticationFilterForLogin(
            AuthenticationManager authenticationManager, JWTProvider jwt) {
        this.authenticationManager = authenticationManager;
        this.jwt = jwt;
    }

    /**
     * Verifica que las credenciales sean "auténticas" <br/>
     * Y en caso de que sean válidas, crea un usuario autenticado por Spring
     *
     * @param request  Objeto {@link HttpServletRequest} Clase de utilidad para manejar la request
     * @param response Objeto {@link HttpServletResponse} Clase de utilidad para manejar la respuesta de la request
     * @return Si todo va bien, retorna {@link Authentication}
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        String usernameOrEmail = request.getParameter("usernameOrEmail");
        String password = request.getParameter("password");
        var authenticationToken = new UsernamePasswordAuthenticationToken(usernameOrEmail, password);
        return this.authenticationManager.authenticate(authenticationToken);
    }

    /**
     * Este método es llamado si toda va bien en {@code attemptAuthentication} recibe el {@link Authentication}<br/>
     * Aqui es donde se crean los tokens y se pasa la informacion necesaria para log-in
     *
     * @param request    Objeto {@link HttpServletRequest} Clase de utilidad para manejar la request
     * @param response   Objeto {@link HttpServletResponse} Clase de utilidad para manejar la respuesta de la request
     * @param chain      Objeto {@link FilterChain} Manejedor del flujo de filtros de Spring
     * @param authResult Objeto {@link Authentication} Es la respuesta de {@code attemptAuthentication}
     */
    @Override
    protected void successfulAuthentication
    (HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        var user = (CustomUserDetails) authResult.getPrincipal();
        var URL = request.getRequestURI();
        String accesToken = jwt.createAccesToken(new User(user.getUserId(), user.getUsername()), URL);
        String refreshToken = jwt.createRefreshToken(new User(user.getUserId(), user.getUsername()));

        response.setHeader("accessToken", accesToken);
        response.setHeader("refreshToken", refreshToken);
        response.setHeader("museumId", String.valueOf(user.getMuseumId()));
    }

}
