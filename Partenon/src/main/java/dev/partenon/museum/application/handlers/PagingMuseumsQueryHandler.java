package dev.partenon.museum.application.handlers;

import dev.partenon.global.domain.abstractcomponents.query.QueryHandler;
import dev.partenon.global.domain.model.Page;
import dev.partenon.global.domain.model.PagedResponse;
import dev.partenon.museum.application.repository.MuseumRepository;
import dev.partenon.museum.domain.PagingMuseumsQuery;
import dev.partenon.museum.domain.entity.Museum;
import dev.partenon.museum.domain.model.MuseumProjection;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class PagingMuseumsQueryHandler implements QueryHandler<PagedResponse<Museum>, PagingMuseumsQuery> {
    @Autowired
    private MuseumRepository repository;

    @Override
    public PagedResponse<Museum> handle(PagingMuseumsQuery query) throws Exception {
        //Validacion
        validatePageNumberAndSize(query.getPage().getIndex(), query.getPage().getSize(), query.getPage().getOrder());

        Pageable pageable = createPageable(query.getPage());

        var pages = repository.findAll(pageable);
        var content = new LinkedList<MuseumProjection>();
        if(pages.getNumberOfElements() != 0){
            pages.getContent().forEach(x ->{
                var projection =new MuseumProjection(x.getMuseumId(), x.getMuseumName());
                projection.setBanner(x.getMuseumBanner() != null
                        ? x.getMuseumBanner().getBanner() : null);
                projection.setDescription(x.getMuseumDescription() != null
                        ? x.getMuseumDescription().getDescription() : null);
                content.addLast(projection);
            });
        }
        //List<Museum> content = pages.getNumberOfElements() == 0 ? Collections.emptyList() : pages.getContent();

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
