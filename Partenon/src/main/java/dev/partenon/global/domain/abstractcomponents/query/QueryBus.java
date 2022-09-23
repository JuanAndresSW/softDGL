package dev.partenon.global.domain.abstractcomponents.query;

/**
 * QueryBus generico
 */
@FunctionalInterface
public interface QueryBus {

    <T> T handle(Query<T> query) throws Exception;

}
