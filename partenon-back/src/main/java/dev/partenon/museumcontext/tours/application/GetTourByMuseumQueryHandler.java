package dev.partenon.museumcontext.tours.application;

import dev.partenon.global.domain.abstractcomponents.command.CommandHandler;
import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;
import dev.partenon.museumcontext.tours.domain.GetTourByMuseumQuery;
import dev.partenon.museumcontext.tours.domain.entity.MuseumTour;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**Maneja la Query echa por GetTourByNameResource*/
@Service
@AllArgsConstructor
public class GetTourByMuseumQueryHandler implements QueryHandler<List<MuseumTour>, GetTourByMuseumQuery> {
    private TourRepository repository;

    @Override
    public List<MuseumTour> handle(GetTourByMuseumQuery query) throws Exception {
        var response =
                repository.findByTourPKMuseumId(query.getMuseumId());

        //Para evitar punteros nulos
        if(response == null || response.isEmpty() || response.size() < 0)
            return Collections.emptyList();
        return response;
    }
}
