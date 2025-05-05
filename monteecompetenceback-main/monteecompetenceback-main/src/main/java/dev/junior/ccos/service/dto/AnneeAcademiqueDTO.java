package dev.junior.ccos.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link dev.junior.ccos.domain.AnneeAcademique} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AnneeAcademiqueDTO implements Serializable {

    private Long id;

    @NotNull
    private String annee;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AnneeAcademiqueDTO)) {
            return false;
        }

        AnneeAcademiqueDTO anneeAcademiqueDTO = (AnneeAcademiqueDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, anneeAcademiqueDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AnneeAcademiqueDTO{" +
            "id=" + getId() +
            ", annee='" + getAnnee() + "'" +
            "}";
    }
}
