package dev.partenon.museumcontext.core.application.handlers.pc;

import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.core.doamin.query.GetQuery;
import dev.partenon.museumcontext.core.doamin.Museum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
/**Maneja la Query de GetMuseumResource*/
public class GetMuseumQueryHandler implements QueryHandler<Museum, GetQuery> {
    @Autowired
    private MuseumRepository repository;

    @Override
    public Museum handle(GetQuery query)
            throws Exception {
        var museum = repository.findByMuseumId(query.getMuseumId());
        return museum.get();
    }
}
