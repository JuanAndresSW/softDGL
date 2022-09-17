package dev.partenon.museum.application.handlers;

import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;
import dev.partenon.museum.application.repository.MuseumRepository;
import dev.partenon.museum.domain.GetMuseumQuery;
import dev.partenon.museum.domain.entity.Museum;
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
