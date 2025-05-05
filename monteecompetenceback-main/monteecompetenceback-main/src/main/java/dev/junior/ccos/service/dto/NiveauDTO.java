package dev.junior.ccos.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link dev.junior.ccos.domain.Niveau} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NiveauDTO implements Serializable {

    private Long id;

    @NotNull
    private String codeNiveau;

    private String libelle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeNiveau() {
        return codeNiveau;
    }

    public void setCodeNiveau(String codeNiveau) {
        this.codeNiveau = codeNiveau;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NiveauDTO)) {
            return false;
        }

        NiveauDTO niveauDTO = (NiveauDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, niveauDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NiveauDTO{" +
            "id=" + getId() +
            ", codeNiveau='" + getCodeNiveau() + "'" +
            ", libelle='" + getLibelle() + "'" +
            "}";
    }
}
