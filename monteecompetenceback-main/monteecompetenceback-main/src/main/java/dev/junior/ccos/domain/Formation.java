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
 * A Formation.
 */
@Entity
@Table(name = "formation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Formation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "code_formation", nullable = false, unique = true)
    private String codeFormation;

    @Column(name = "libelle_formation")
    private String libelleFormation;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "formation")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "etudiant", "niveau", "anneeAcademique", "formation" }, allowSetters = true)
    private Set<Inscription> inscriptions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Formation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeFormation() {
        return this.codeFormation;
    }

    public Formation codeFormation(String codeFormation) {
        this.setCodeFormation(codeFormation);
        return this;
    }

    public void setCodeFormation(String codeFormation) {
        this.codeFormation = codeFormation;
    }

    public String getLibelleFormation() {
        return this.libelleFormation;
    }

    public Formation libelleFormation(String libelleFormation) {
        this.setLibelleFormation(libelleFormation);
        return this;
    }

    public void setLibelleFormation(String libelleFormation) {
        this.libelleFormation = libelleFormation;
    }

    public Set<Inscription> getInscriptions() {
        return this.inscriptions;
    }

    public void setInscriptions(Set<Inscription> inscriptions) {
        if (this.inscriptions != null) {
            this.inscriptions.forEach(i -> i.setFormation(null));
        }
        if (inscriptions != null) {
            inscriptions.forEach(i -> i.setFormation(this));
        }
        this.inscriptions = inscriptions;
    }

    public Formation inscriptions(Set<Inscription> inscriptions) {
        this.setInscriptions(inscriptions);
        return this;
    }

    public Formation addInscriptions(Inscription inscription) {
        this.inscriptions.add(inscription);
        inscription.setFormation(this);
        return this;
    }

    public Formation removeInscriptions(Inscription inscription) {
        this.inscriptions.remove(inscription);
        inscription.setFormation(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Formation)) {
            return false;
        }
        return getId() != null && getId().equals(((Formation) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Formation{" +
            "id=" + getId() +
            ", codeFormation='" + getCodeFormation() + "'" +
            ", libelleFormation='" + getLibelleFormation() + "'" +
            "}";
    }
}
