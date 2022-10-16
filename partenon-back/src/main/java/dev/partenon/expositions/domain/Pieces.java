package dev.partenon.expositions.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.partenon.museumcontext.core.doamin.Museum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Table(name = "pieces")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Pieces implements Serializable {
    public static final Long serialVersionUID = 1L;

    @Id
    @Column(name = "piece_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pieceId;

    @Column(name = "piece_name", nullable = false, length = 30)
    private String pieceName;
    @Column(name = "description", nullable = false, length = 300)
    private String description;

    @Lob
    @Column(name = "photo", nullable = false)
    private String photo;

    @JsonIgnore
    @JoinColumn(name = "exposition_id", nullable = false)
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private Expositions expositions;

    public static Pieces create(SavePieceCommand command, Expositions exposition){
        var piece = new Pieces();
        piece.setPieceName(command.getPieceName());
        piece.setPhoto(command.getPhoto());
        piece.setDescription(command.getDescription());
        piece.setExpositions(exposition);

        return piece;
    }
}
