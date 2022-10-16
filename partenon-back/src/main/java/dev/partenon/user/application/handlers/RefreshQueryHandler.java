package dev.partenon.user.application.handlers;


import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;
import dev.partenon.global.domain.model.CustomUserDetails;
import dev.partenon.global.infrastructure.security.JWTProvider;
import dev.partenon.user.domain.RefreshQuery;
import dev.partenon.user.domain.User;
import dev.partenon.user.domain.model.TokenUpdated;
import dev.partenon.global.infrastructure.adapters.CustomUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**Query que maneja el handler del Refresh Resource*/
@Service
@AllArgsConstructor
public class RefreshQueryHandler implements QueryHandler<TokenUpdated, RefreshQuery> {
    private final JWTProvider jwtProvider;
    private final CustomUserDetailsService service;

    @Override
    public TokenUpdated handle(RefreshQuery query) throws Exception {
        var token = jwtProvider.validateRequest(query.getHeaderToken());
        var username = jwtProvider.getSubjectUsername(token);

        var user = (CustomUserDetails) service.loadUserByUsername(username);
        var tokenUpdated = TokenUpdated.builder()
                .accessToken(jwtProvider.createAccesToken(
                        new User(user.getUserId(), user.getUsername()), "http://localhost:8080/api/auth/refresh"))
                .refreshToken(jwtProvider.createRefreshToken(
                        new User(user.getUserId(), user.getUsername())))
                .museumId(String.valueOf(user.getMuseumId()))
                .build();
        return tokenUpdated;
    }

}
