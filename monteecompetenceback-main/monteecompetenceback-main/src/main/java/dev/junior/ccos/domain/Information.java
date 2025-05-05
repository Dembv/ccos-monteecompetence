package dev.junior.ccos.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Information.
 */
@Entity
@Table(name = "information")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Information implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "titre")
    private String titre;

    @Lob
    @Column(name = "image_infos")
    private byte[] imageInfos;

    @Column(name = "image_infos_content_type")
    private String imageInfosContentType;

    @Column(name = "contenu")
    private String contenu;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Information id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return this.titre;
    }

    public Information titre(String titre) {
        this.setTitre(titre);
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public byte[] getImageInfos() {
        return this.imageInfos;
    }

    public Information imageInfos(byte[] imageInfos) {
        this.setImageInfos(imageInfos);
        return this;
    }

    public void setImageInfos(byte[] imageInfos) {
        this.imageInfos = imageInfos;
    }

    public String getImageInfosContentType() {
        return this.imageInfosContentType;
    }

    public Information imageInfosContentType(String imageInfosContentType) {
        this.imageInfosContentType = imageInfosContentType;
        return this;
    }

    public void setImageInfosContentType(String imageInfosContentType) {
        this.imageInfosContentType = imageInfosContentType;
    }

    public String getContenu() {
        return this.contenu;
    }

    public Information contenu(String contenu) {
        this.setContenu(contenu);
        return this;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Information)) {
            return false;
        }
        return getId() != null && getId().equals(((Information) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Information{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", imageInfos='" + getImageInfos() + "'" +
            ", imageInfosContentType='" + getImageInfosContentType() + "'" +
            ", contenu='" + getContenu() + "'" +
            "}";
    }
}
