package dev.partenon.user.application.handlers;

import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;
import dev.partenon.global.infrastructure.security.JWTProvider;
import dev.partenon.user.application.UserRepository;
import dev.partenon.user.domain.InitQuery;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@AllArgsConstructor
public class InitQueryHandler implements QueryHandler<String, InitQuery> {
    @Autowired
    private final JWTProvider jwt;
    @Autowired
    private final UserRepository repository;

    @Override
    public String handle(InitQuery query) throws Exception {
        var token = jwt.validateRequest(query.getAuthToken());
        if(StringUtils.hasText(token)){
            var username = jwt.getSubjectUsername(token);
            var user = repository.findByUsernameOrEmail(username, username);
            if(user.isEmpty())
                return null;
            return user.get().getUserId().toString();
        }
        return null;
    }


}
