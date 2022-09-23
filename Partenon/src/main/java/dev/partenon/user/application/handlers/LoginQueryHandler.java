package dev.partenon.user.application.handlers;

import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;
import dev.partenon.global.infrastructure.security.JWTProvider;
import dev.partenon.user.application.UserRepository;
import dev.partenon.user.domain.model.TokenModel;
import dev.partenon.user.domain.LoginQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class LoginQueryHandler implements QueryHandler<TokenModel, LoginQuery> {
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTProvider jwtProvider;

    @Override
    public TokenModel handle(LoginQuery query) throws Exception {

        MultiValueMap<String, String> keys = new LinkedMultiValueMap<>();
        keys.add("usernameOrEmail", query.getUsernameOrEmail());
        keys.add("password", query.getPassword());

        var headers = WebClient.builder().baseUrl("http://localhost:8080").build()
                .post().uri("/login").contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.ALL).body(BodyInserters.fromFormData(keys))
                .retrieve().toEntity(String.class).block().getHeaders();

        return new TokenModel(
                headers.get("museumId").get(0),
                headers.get("accessToken").get(0),
                headers.get("refreshToken").get(0));
    }
}
