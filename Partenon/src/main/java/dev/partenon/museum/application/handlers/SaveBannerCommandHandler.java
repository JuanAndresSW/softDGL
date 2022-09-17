package dev.partenon.museum.application.handlers;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museum.application.repository.BannerRepository;
import dev.partenon.museum.application.repository.MuseumRepository;
import dev.partenon.museum.domain.commands.SaveBannerCommand;
import dev.partenon.museum.domain.entity.MuseumBanner;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class SaveBannerCommandHandler implements CommandHandler<SaveBannerCommand> {
    @Autowired
    private MuseumRepository museumRepository;
    @Autowired
    private BannerRepository bannerRepository;

    @Override
    public void handle(SaveBannerCommand command) throws Exception {
        var museum = museumRepository.findByMuseumId(command.getMuseumId());
        if(museum.isEmpty())
            throw new Exception("ID no registrado");

        bannerRepository.save(MuseumBanner.create(command.getMuseumBanner(), museum.get()));
    }
}
