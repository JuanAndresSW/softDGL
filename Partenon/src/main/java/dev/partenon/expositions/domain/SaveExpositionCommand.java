package dev.partenon.expositions.domain;

import dev.partenon.global.domain.abstractcomponents.command.Command;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SaveExpositionCommand extends Command {
    private String name;
    private String description;
    private String photo;
    private String category;
    private Long museumId;
}
