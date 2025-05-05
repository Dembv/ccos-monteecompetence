package dev.junior.ccos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AnneeAcademique.
 */
@Entity
@Table(name = "annee_academique")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AnneeAcademique implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "annee", nullable = false, unique = true)
    private String annee;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "anneeAcademique")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "etudiant", "niveau", "anneeAcademique", "formation" }, allowSetters = true)
    private Set<Inscription> inscriptions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AnneeAcademique id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnnee() {
        return this.annee;
    }

    public AnneeAcademique annee(String annee) {
        this.setAnnee(annee);
        return this;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public Set<Inscription> getInscriptions() {
        return this.inscriptions;
    }

    public void setInscriptions(Set<Inscription> inscriptions) {
        if (this.inscriptions != null) {
            this.inscriptions.forEach(i -> i.setAnneeAcademique(null));
        }
        if (inscriptions != null) {
            inscriptions.forEach(i -> i.setAnneeAcademique(this));
        }
        this.inscriptions = inscriptions;
    }

    public AnneeAcademique inscriptions(Set<Inscription> inscriptions) {
        this.setInscriptions(inscriptions);
        return this;
    }

    public AnneeAcademique addInscriptions(Inscription inscription) {
        this.inscriptions.add(inscription);
        inscription.setAnneeAcademique(this);
        return this;
    }

    public AnneeAcademique removeInscriptions(Inscription inscription) {
        this.inscriptions.remove(inscription);
        inscription.setAnneeAcademique(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AnneeAcademique)) {
            return false;
        }
        return getId() != null && getId().equals(((AnneeAcademique) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AnneeAcademique{" +
            "id=" + getId() +
            ", annee='" + getAnnee() + "'" +
            "}";
    }
}
