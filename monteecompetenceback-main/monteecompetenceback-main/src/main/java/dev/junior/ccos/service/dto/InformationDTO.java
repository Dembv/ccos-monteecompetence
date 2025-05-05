package dev.junior.ccos.service.dto;

import jakarta.persistence.Lob;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link dev.junior.ccos.domain.Information} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class InformationDTO implements Serializable {

    private Long id;

    private String titre;

    @Lob
    private byte[] imageInfos;

    private String imageInfosContentType;
    private String contenu;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public byte[] getImageInfos() {
        return imageInfos;
    }

    public void setImageInfos(byte[] imageInfos) {
        this.imageInfos = imageInfos;
    }

    public String getImageInfosContentType() {
        return imageInfosContentType;
    }

    public void setImageInfosContentType(String imageInfosContentType) {
        this.imageInfosContentType = imageInfosContentType;
    }

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InformationDTO)) {
            return false;
        }

        InformationDTO informationDTO = (InformationDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, informationDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InformationDTO{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", imageInfos='" + getImageInfos() + "'" +
            ", contenu='" + getContenu() + "'" +
            "}";
    }
}
