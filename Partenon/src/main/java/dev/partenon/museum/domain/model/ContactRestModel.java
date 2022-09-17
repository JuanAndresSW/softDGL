package dev.partenon.museum.domain.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ContactRestModel {
    private String contact;
    private String type;
}
