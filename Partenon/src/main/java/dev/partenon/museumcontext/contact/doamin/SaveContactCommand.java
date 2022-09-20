package dev.partenon.museumcontext.contact.doamin;

import dev.partenon.global.domain.abstractcomponents.command.Command;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SaveContactCommand extends Command {
    private String contact;
    private String type;
    private Long museumId;
}
