package dev.partenon.museumcontext.core.application.handlers;

import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.core.doamin.GetMuseumByNameQuery;
import dev.partenon.museumcontext.core.doamin.GetMuseumQuery;
import dev.partenon.museumcontext.core.doamin.Museum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
public class GetMuseumByNameQueryHandler implements QueryHandler<List<Museum>, GetMuseumByNameQuery> {
    @Autowired
    private MuseumRepository repository;

    @Override
    public List<Museum> handle(GetMuseumByNameQuery query)
            throws Exception {
        log.info("Query is: {}", query.getCharactersNames());
        var museum = repository.searchByName(query.getCharactersNames());

        return museum;
    }
}
