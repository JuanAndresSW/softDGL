package dev.partenon.museum.domain.commands;

import dev.partenon.global.domain.abstractcomponents.command.Command;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SaveBannerCommand extends Command {
    private String museumBanner;
    private Long museumId;
}
