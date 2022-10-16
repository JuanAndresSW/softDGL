package dev.partenon.user.application;

import dev.partenon.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long> {
    //Busca en base al username o el email
    Optional<User>findByUsernameOrEmail(String username, String email);
}
