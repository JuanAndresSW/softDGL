package dev.partenon.user.application;

import dev.partenon.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User>findByUsernameOrEmail(String username, String email);
}
