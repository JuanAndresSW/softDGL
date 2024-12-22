package dev.partenon.museumcontext.banner.application;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.museumcontext.banner.application.BannerRepository;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.banner.doamin.SaveBannerCommand;
import dev.partenon.museumcontext.banner.doamin.MuseumBanner;
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
