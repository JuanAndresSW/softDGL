package dev.partenon.global.infrastructure.resource;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * Esta clase se encarga de manejar el envio de errores
 */
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Maneja una excepcion genérica <br/>
     * Es decir cualquier excepcion que no tenga una clase propia se dirigirá a este método
     */
    @ExceptionHandler(Exception.class)
    public HttpEntity<String> handleResourceNotFoundException(Exception exception, WebRequest webRequest) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Maneja la excepcion de tipo Runtime exception
     */
    @ExceptionHandler(RuntimeException.class)
    public HttpEntity<String> handleRuntimeExceotion(RuntimeException exception, WebRequest webRequest) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Sobre escribe el metodo que maneja la excepcion MethodArgumentNotValidException
     */
    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        Map<String, String> errores = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String name = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errores.put(name, message);
        });
        return new ResponseEntity<>(errores, HttpStatus.BAD_REQUEST);
    }
}
