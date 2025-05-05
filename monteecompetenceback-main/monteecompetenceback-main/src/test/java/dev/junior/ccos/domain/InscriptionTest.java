package dev.junior.ccos.domain;

import static dev.junior.ccos.domain.AnneeAcademiqueTestSamples.*;
import static dev.junior.ccos.domain.EtudiantTestSamples.*;
import static dev.junior.ccos.domain.FormationTestSamples.*;
import static dev.junior.ccos.domain.InscriptionTestSamples.*;
import static dev.junior.ccos.domain.NiveauTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import dev.junior.ccos.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InscriptionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Inscription.class);
        Inscription inscription1 = getInscriptionSample1();
        Inscription inscription2 = new Inscription();
        assertThat(inscription1).isNotEqualTo(inscription2);

        inscription2.setId(inscription1.getId());
        assertThat(inscription1).isEqualTo(inscription2);

        inscription2 = getInscriptionSample2();
        assertThat(inscription1).isNotEqualTo(inscription2);
    }

    @Test
    void etudiantTest() throws Exception {
        Inscription inscription = getInscriptionRandomSampleGenerator();
        Etudiant etudiantBack = getEtudiantRandomSampleGenerator();

        inscription.setEtudiant(etudiantBack);
        assertThat(inscription.getEtudiant()).isEqualTo(etudiantBack);

        inscription.etudiant(null);
        assertThat(inscription.getEtudiant()).isNull();
    }

    @Test
    void niveauTest() throws Exception {
        Inscription inscription = getInscriptionRandomSampleGenerator();
        Niveau niveauBack = getNiveauRandomSampleGenerator();

        inscription.setNiveau(niveauBack);
        assertThat(inscription.getNiveau()).isEqualTo(niveauBack);

        inscription.niveau(null);
        assertThat(inscription.getNiveau()).isNull();
    }

    @Test
    void anneeAcademiqueTest() throws Exception {
        Inscription inscription = getInscriptionRandomSampleGenerator();
        AnneeAcademique anneeAcademiqueBack = getAnneeAcademiqueRandomSampleGenerator();

        inscription.setAnneeAcademique(anneeAcademiqueBack);
        assertThat(inscription.getAnneeAcademique()).isEqualTo(anneeAcademiqueBack);

        inscription.anneeAcademique(null);
        assertThat(inscription.getAnneeAcademique()).isNull();
    }

    @Test
    void formationTest() throws Exception {
        Inscription inscription = getInscriptionRandomSampleGenerator();
        Formation formationBack = getFormationRandomSampleGenerator();

        inscription.setFormation(formationBack);
        assertThat(inscription.getFormation()).isEqualTo(formationBack);

        inscription.formation(null);
        assertThat(inscription.getFormation()).isNull();
    }
}
