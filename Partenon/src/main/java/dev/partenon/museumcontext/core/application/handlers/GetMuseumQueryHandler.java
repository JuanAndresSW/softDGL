package dev.partenon.museumcontext.core.application.handlers;

import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.core.doamin.GetMuseumQuery;
import dev.partenon.museumcontext.core.doamin.Museum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
public class GetMuseumQueryHandler implements QueryHandler<Museum, GetMuseumQuery> {
    @Autowired
    private MuseumRepository repository;

    @Override
    public Museum handle(GetMuseumQuery query)
            throws Exception {
        var museum = repository.findByMuseumId(query.getMuseumId());
        return museum.get();
    }
}
