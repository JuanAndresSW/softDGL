package dev.partenon.expositions.application;

import dev.partenon.expositions.domain.Expositions;
import dev.partenon.expositions.domain.PagingExpositionsQuery;
import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;
import dev.partenon.global.domain.model.Page;
import dev.partenon.global.domain.model.PagedResponse;
import dev.partenon.museumcontext.core.doamin.Museum;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class PagingExpositionsQueryHandler implements QueryHandler<PagedResponse<Expositions>, PagingExpositionsQuery> {

    @Autowired
    private ExpositionRepository repository;

    @Override
    public PagedResponse<Expositions> handle(PagingExpositionsQuery query)
            throws Exception {
        var pageable = createPageable(query.getPage());
        var pages = repository.findByMuseumOwnerExposition
                (new Museum(query.getMuseumId()), pageable);

        List<Expositions> content = pages.getTotalPages() == 0 ? Collections.emptyList() : pages.getContent();

        return new PagedResponse(content, pages.getNumber(), pages.getSize(),
                pages.getTotalElements(), pages.getTotalPages(), pages.isLast());
    }

    private Pageable createPageable(Page page) {
        if (page.getOrder().equals("asc")) {
            return PageRequest.of(page.getIndex(), page.getSize(), Sort.Direction.ASC, page.getSort());
        }
        return PageRequest.of(page.getIndex(), page.getSize(), Sort.Direction.DESC, page.getSort());
    }

    /**
     * Comprueba que lo datos de paginacion tengan sentido
     *
     * @param index Numero de pagina
     * @param size  Tamaño de pagina
     * @param order Orden puede ser ascendente o descendiente
     */
    private void validatePageNumberAndSize(int index, int size, String order) throws Exception {
        if (index < 0) {
            throw new Exception("Page number cannot be less than zero.");
        }

        if (size < 0) {
            throw new Exception("Size number cannot be less than zero.");
        }

        if (size > 12) {
            throw new Exception("Page size must not be greater than " + 12);
        }
        if (!order.equals("asc") && !order.equals("desc")) {
            throw new Exception("Order not found");
        }
    }
}
