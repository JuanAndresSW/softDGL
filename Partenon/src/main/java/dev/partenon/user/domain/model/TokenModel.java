package dev.partenon.user.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public final class TokenModel {
    private String museumId;
    private String accessToken;
    private String refreshToken;
}
