package dev.partenon.global.infrastructure.security;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import dev.partenon.user.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.util.Base64;
import java.util.Date;

/**
 * Clase encargada de manejar todo lo relacionado al Token JWT
 */
public class JWTProvider {
    //Valores se encuentran el application.yml
    @Value("${jwt.secret}")
    private String secrectKey;
    @Value("${jwt.expired}")
    private long expDateDefined;

    /**
     * Vuelve a codificar la clave secreta
     */
    @PostConstruct
    protected void init() {
        //Vuelve a codificar la clave del token en base64
        this.secrectKey = Base64.getEncoder().encodeToString(secrectKey.getBytes());
    }

    /**
     * Crea el algoritmo de encriptacion del token
     */
    public Algorithm signKey() {
        return Algorithm.HMAC256(secrectKey.getBytes());
    }


    /**
     * Crea el accessToken
     *
     * @param user Usuario que crea el token
     * @param url  URL desde donde se esta creando
     * @return Devuelve un AccessToken
     */
    public String createAccesToken(User user, String url) {
        var NOW = new Date(System.currentTimeMillis());
        return com.auth0.jwt.JWT.create()
                .withSubject(user.getUsername())
                .withClaim("id", user.getUserId().toString())
                .withIssuedAt(NOW)
                .withExpiresAt(new Date(NOW.getTime() + expDateDefined))
                .withIssuer(url)
                .sign(signKey());
    }

    /**
     * Crea el refresh Token
     *
     * @param user Usuario que crea el token
     * @return Devuelve un RefeshToken
     */
    public String createRefreshToken(User user) {
        var NOW = new Date(System.currentTimeMillis());
        return com.auth0.jwt.JWT.create()
                .withSubject(user.getUsername())
                .withClaim("id", user.getUserId().toString())
                .withIssuedAt(NOW)
                .withExpiresAt(new Date(NOW.getTime() + expDateDefined + 259200000))
                .sign(signKey());
    }

    /**
     * Decodifica un token JWT
     *
     * @param token Token JWT
     * @return {@link  DecodedJWT} Es la clase que almacena el token decodificado
     */
    public DecodedJWT decoderToken(String token) {
        return com.auth0.jwt.JWT.require(this.signKey()).build().verify(token);
    }

    /**
     * Verifica que el token sea valido
     *
     * @param token Token JWT
     * @return Devuelve true si es valido, false si no
     */
    public boolean validate(String token) {
        try {
            //Si no tiene texto no es valido
            if (!StringUtils.hasText(token))
                return false;
            //Si arroja una excepcion no es valido
            var decodedToken = decoderToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    public String validateRequest(String auth) {
        if(Boolean.TRUE.equals(StringUtils.hasText(auth) && auth.startsWith("Bearer "))){
            //Divide el token en la palabra Bearer y el token un array de dos elementos
            var divideToken = auth.split(" ");
            if(divideToken.length == 2)
                return divideToken[1];
        }
        return null;
    }


    /**
     * Recupera el Subject del Token (Siempre sera el username)
     * @param token Token JWT
     * @return
     */
    public String getSubjectUsername(String token){
        try {
            return decoderToken(token).getSubject();
        }catch (Exception e) {
            return "bad token";
        }
    }
}
