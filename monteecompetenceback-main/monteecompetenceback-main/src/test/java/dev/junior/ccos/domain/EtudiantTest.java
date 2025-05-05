package dev.junior.ccos.domain;

import static dev.junior.ccos.domain.EtudiantTestSamples.*;
import static dev.junior.ccos.domain.InscriptionTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import dev.junior.ccos.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class EtudiantTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Etudiant.class);
        Etudiant etudiant1 = getEtudiantSample1();
        Etudiant etudiant2 = new Etudiant();
        assertThat(etudiant1).isNotEqualTo(etudiant2);

        etudiant2.setId(etudiant1.getId());
        assertThat(etudiant1).isEqualTo(etudiant2);

        etudiant2 = getEtudiantSample2();
        assertThat(etudiant1).isNotEqualTo(etudiant2);
    }

    @Test
    void inscriptionsTest() throws Exception {
        Etudiant etudiant = getEtudiantRandomSampleGenerator();
        Inscription inscriptionBack = getInscriptionRandomSampleGenerator();

        etudiant.addInscriptions(inscriptionBack);
        assertThat(etudiant.getInscriptions()).containsOnly(inscriptionBack);
        assertThat(inscriptionBack.getEtudiant()).isEqualTo(etudiant);

        etudiant.removeInscriptions(inscriptionBack);
        assertThat(etudiant.getInscriptions()).doesNotContain(inscriptionBack);
        assertThat(inscriptionBack.getEtudiant()).isNull();

        etudiant.inscriptions(new HashSet<>(Set.of(inscriptionBack)));
        assertThat(etudiant.getInscriptions()).containsOnly(inscriptionBack);
        assertThat(inscriptionBack.getEtudiant()).isEqualTo(etudiant);

        etudiant.setInscriptions(new HashSet<>());
        assertThat(etudiant.getInscriptions()).doesNotContain(inscriptionBack);
        assertThat(inscriptionBack.getEtudiant()).isNull();
    }
}
