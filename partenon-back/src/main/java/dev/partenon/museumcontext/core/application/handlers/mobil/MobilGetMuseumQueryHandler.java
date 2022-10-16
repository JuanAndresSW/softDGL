package dev.partenon.museumcontext.core.application.handlers.mobil;

import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;

import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.core.doamin.models.MobilMuseumProjection;
import dev.partenon.museumcontext.core.doamin.query.MobileGetQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class MobilGetMuseumQueryHandler implements QueryHandler<MobilMuseumProjection, MobileGetQuery> {
    @Autowired
    private MuseumRepository repository;

    @Override
    public MobilMuseumProjection handle(MobileGetQuery query) throws Exception {
        var museum = repository.findByMuseumId(query.getMuseumId());
        if(museum.isEmpty())
            throw new Exception("ID De museo no registrado");

        var response = MobilMuseumProjection.create(museum.get());
        return response;
    }
}
