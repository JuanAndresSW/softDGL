package dev.partenon.global.infrastructure.security;

import dev.partenon.user.infrastructure.AuthenticationFilterForLogin;
import dev.partenon.global.infrastructure.adapters.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**Maneja la configuracion de Seguridad de Spring*/
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private CustomUserDetailsService userDetailsService;

    /**
     * Configura la seguridad de las peticiones Http
     *
     * @param http Parámetro para cofigurar las peticiones
     * @throws Exception Arroja una excepcion generica
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //Desactivo el Cross-site request forgery no es necesario
                .csrf().disable()
                //Desactivo el http-basic no es necesario
                .httpBasic().disable()
                //Marco una politica de no sesiones
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        //Le digo que es lo que tiene que hacer el entry-point
        http.exceptionHandling().authenticationEntryPoint(
                (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) ->
                        httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                                "Sorry, You're not authorized to access this resource."));

        //Autorización de las request
        http.authorizeRequests(configurer ->
                configurer.antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/login").permitAll()
                .antMatchers(HttpMethod.GET, "/api/museums/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/expositions/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/tours/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/mobil/**").permitAll()
                .antMatchers("/", "/favicon.ico",
                                "/**/*.png",
                                "/**/*.gif",
                                "/**/*.svg",
                                "/**/*.jpg",
                                "/**/*.html",
                                "/**/*.css",
                                "/**/*.js").permitAll()
                        .anyRequest().authenticated());
        //Provedor de autenticacion personalizado
        http.authenticationProvider(authenticationProvider());

        //Filtros
        http.addFilter(new AuthenticationFilterForLogin(this.authenticationManager(), jwtProvider()));
        http.addFilterBefore(new AuthorizationFilter(jwtProvider()), UsernamePasswordAuthenticationFilter.class);
        //Configuracion de CORS
        http.cors().configurationSource(new CorsConfig().corsConfigurationSource());

        return http.build();
    }



    //Defino algunos Bean para el application.context de spring
    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(authenticationProvider());
    }

    //Apartir de aqui solo hay Beans
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new Argon2PasswordEncoder(16, 32, 1, 2048, 2);
    }
    @Bean
    public JWTProvider jwtProvider(){
        return new JWTProvider();
    }
    @Bean
    public JavaMailSenderImpl javaMailSender(){
        return new JavaMailSenderImpl();
    }
}
