package dev.partenon.user.domain;

import dev.partenon.global.domain.abstractcomponents.query.Query;
import dev.partenon.user.domain.model.TokenModel;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginQuery extends Query<TokenModel> {
    private String usernameOrEmail;
    private String password;
}
