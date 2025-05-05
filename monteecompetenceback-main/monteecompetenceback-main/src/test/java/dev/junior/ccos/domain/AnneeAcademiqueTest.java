package dev.junior.ccos.domain;

import static dev.junior.ccos.domain.AnneeAcademiqueTestSamples.*;
import static dev.junior.ccos.domain.InscriptionTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import dev.junior.ccos.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AnneeAcademiqueTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnneeAcademique.class);
        AnneeAcademique anneeAcademique1 = getAnneeAcademiqueSample1();
        AnneeAcademique anneeAcademique2 = new AnneeAcademique();
        assertThat(anneeAcademique1).isNotEqualTo(anneeAcademique2);

        anneeAcademique2.setId(anneeAcademique1.getId());
        assertThat(anneeAcademique1).isEqualTo(anneeAcademique2);

        anneeAcademique2 = getAnneeAcademiqueSample2();
        assertThat(anneeAcademique1).isNotEqualTo(anneeAcademique2);
    }

    @Test
    void inscriptionsTest() throws Exception {
        AnneeAcademique anneeAcademique = getAnneeAcademiqueRandomSampleGenerator();
        Inscription inscriptionBack = getInscriptionRandomSampleGenerator();

        anneeAcademique.addInscriptions(inscriptionBack);
        assertThat(anneeAcademique.getInscriptions()).containsOnly(inscriptionBack);
        assertThat(inscriptionBack.getAnneeAcademique()).isEqualTo(anneeAcademique);

        anneeAcademique.removeInscriptions(inscriptionBack);
        assertThat(anneeAcademique.getInscriptions()).doesNotContain(inscriptionBack);
        assertThat(inscriptionBack.getAnneeAcademique()).isNull();

        anneeAcademique.inscriptions(new HashSet<>(Set.of(inscriptionBack)));
        assertThat(anneeAcademique.getInscriptions()).containsOnly(inscriptionBack);
        assertThat(inscriptionBack.getAnneeAcademique()).isEqualTo(anneeAcademique);

        anneeAcademique.setInscriptions(new HashSet<>());
        assertThat(anneeAcademique.getInscriptions()).doesNotContain(inscriptionBack);
        assertThat(inscriptionBack.getAnneeAcademique()).isNull();
    }
}
