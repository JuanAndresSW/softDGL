package dev.partenon.global.infrastructure.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Data
@Component
public class AuthorizationFilter extends OncePerRequestFilter {
     @Autowired
    private final JWTProvider jwtProvider;

    /**
     * Decide si la request ingresa (Autoriza) a la API o es rechazada
     *
     * @param request     Parámetro para que maneja la request
     * @param response    Parametro para marcar la respuesta de la request
     * @param filterChain Enviá el resultado del filtro
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (isNotRequiredAuthorization(request)) {
            filterChain.doFilter(request, response);
        } else {
            String authHeader = request.getHeader(AUTHORIZATION);
            var token = jwtProvider.validateRequest(authHeader);
            try {
                if(token != null) {
                    setUpSpringAuthentication(token, request);
                }
            } catch (Exception ex) {
                response.setHeader("error", ex.getMessage());
                response.setStatus(UNAUTHORIZED.value());
                Map<String, String> error = new HashMap<>();
                error.put("error-message", ex.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);

                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
            filterChain.doFilter(request, response);
        }
    }

    /**
     * Metodo para autenticarnos dentro del flujo de Spring
     */
    private void setUpSpringAuthentication(String token, HttpServletRequest request) {
        var username = jwtProvider.getSubjectUsername(token);
        var authUser = new UsernamePasswordAuthenticationToken(username, null, null);
        authUser.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authUser);
    }


    private boolean isNotRequiredAuthorization(HttpServletRequest request) {
        return  request.getServletPath().equals("/login") ||
                request.getServletPath().equals("/api/auth/login") ||
                request.getServletPath().equals("/api/museums/all") ||
                request.getServletPath().equals("/api/museums") ||
                request.getServletPath().equals("/api/auth/museums");
    }

}
