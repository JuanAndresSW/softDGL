package dev.partenon.global.domain.abstractcomponents.command;

/**
 * CommandBus generico
 */
@FunctionalInterface
public interface CommandBus {
    void handle(Command command) throws Exception;
}
