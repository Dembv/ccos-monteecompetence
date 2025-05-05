package dev.junior.ccos.service.dto;

import java.time.Instant;

public class InscriptionInfoDTO {

    //attributs
    private Long id;
    private Instant dateInscription;
    private String libelleFormation;
    private String libelle;
    private String anneeAcademique;

    public InscriptionInfoDTO(Long id, Instant dateInscription, String libelleFormation, String libelle, String anneeAcademique) {
        this.id = id;
        this.dateInscription = dateInscription;
        this.libelleFormation = libelleFormation;
        this.libelle = libelle;
        this.anneeAcademique = anneeAcademique;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateInscription() {
        return dateInscription;
    }

    public void setDateInscription(Instant dateInscription) {
        this.dateInscription = dateInscription;
    }

    public String getLibelleFormation() {
        return libelleFormation;
    }

    public void setLibelleFormation(String libelleFormation) {
        this.libelleFormation = libelleFormation;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getAnneeAcademique() {
        return anneeAcademique;
    }

    public void setAnneeAcademique(String anneeAcademique) {
        this.anneeAcademique = anneeAcademique;
    }

    @Override
    public String toString() {
        return (
            "InscriptionInfoDTO{" +
            "id=" +
            id +
            ", dateInscription=" +
            dateInscription +
            ", libelleFormation='" +
            libelleFormation +
            '\'' +
            ", libelle='" +
            libelle +
            '\'' +
            ", anneeAcademique='" +
            anneeAcademique +
            '\'' +
            '}'
        );
    }
}
