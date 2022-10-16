package dev.partenon.museumcontext.core.application.handlers.mobil;

import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;
import dev.partenon.global.domain.model.Page;
import dev.partenon.global.domain.model.PagedResponse;
import dev.partenon.museumcontext.core.application.MuseumRepository;
import dev.partenon.museumcontext.core.doamin.models.MobileSummaryMuseumProjection;
import dev.partenon.museumcontext.core.doamin.query.MobilePagingByNameQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.LinkedList;

@Service
public class MobilPagingByNameQueryHandler implements QueryHandler<PagedResponse<MobileSummaryMuseumProjection>, MobilePagingByNameQuery> {
    @Autowired
    private MuseumRepository repository;

    @Override
    public PagedResponse<MobileSummaryMuseumProjection> handle(MobilePagingByNameQuery query) throws Exception {
        //Validacion
        validatePageNumberAndSize(query.getPage().getIndex(), query.getPage().getSize(), query.getPage().getOrder());

        var pageable = createPageable(query.getPage());
        var pages = repository.searchByName(query.getCharactersNames(), pageable);

        var content = new LinkedList<MobileSummaryMuseumProjection>();
        if(pages.getNumberOfElements() != 0){
            //Paso los datos a la proyección
            pages.getContent().forEach(x ->{
                var projection =new MobileSummaryMuseumProjection(x.getMuseumId(), x.getMuseumName());
                //Compruebo que no sea nulo con un ternario
                projection.setDescription(x.getMuseumDescription() != null ?
                        x.getMuseumDescription().getDescription() : null);
                content.addLast(projection);
            });
        }

        return new PagedResponse(content, pages.getNumber(), pages.getSize(),
                pages.getTotalElements(), pages.getTotalPages(), pages.isLast());
    }

    /**
     * Crea el objeto {@link Pageable} necesario para la paginación
     *
     * @param page Contiene los parámetros  necesarios para crear el objeto
     * @return
     */
    private Pageable createPageable(Page page) {
        if (page.getOrder().equals("asc")) {
            return PageRequest.of(page.getIndex(), page.getSize(), Sort.Direction.ASC, page.getSort());
        }
        return PageRequest.of(page.getIndex(), page.getSize(), Sort.Direction.DESC, page.getSort());
    }

    /**
     * Comprueba que lo datos para crear el objeto {@code Pageable} sean válidos
     *
     * @param index Número de página
     * @param size  Tamaño de página
     * @param order Orden puede ser ascendente o descendente
     */
    private void validatePageNumberAndSize(int index, int size, String order) throws Exception {
        if (index < 0) {
            throw new Exception("Número de página no puede ser menor a 0");
        }

        if (size < 0) {
            throw new Exception("Tamaño de página no puede ser menor a 0");
        }

        if (size > 25) {
            throw new Exception("Tamaño de página no puede ser mayor a " + 25);
        }
        if (!order.equals("asc") && !order.equals("desc")) {
            throw new Exception("Orden no válidos");
        }
    }
}
