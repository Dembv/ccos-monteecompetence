package dev.junior.ccos.domain;

import static dev.junior.ccos.domain.FormationTestSamples.*;
import static dev.junior.ccos.domain.InscriptionTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import dev.junior.ccos.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class FormationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Formation.class);
        Formation formation1 = getFormationSample1();
        Formation formation2 = new Formation();
        assertThat(formation1).isNotEqualTo(formation2);

        formation2.setId(formation1.getId());
        assertThat(formation1).isEqualTo(formation2);

        formation2 = getFormationSample2();
        assertThat(formation1).isNotEqualTo(formation2);
    }

    @Test
    void inscriptionsTest() throws Exception {
        Formation formation = getFormationRandomSampleGenerator();
        Inscription inscriptionBack = getInscriptionRandomSampleGenerator();

        formation.addInscriptions(inscriptionBack);
        assertThat(formation.getInscriptions()).containsOnly(inscriptionBack);
        assertThat(inscriptionBack.getFormation()).isEqualTo(formation);

        formation.removeInscriptions(inscriptionBack);
        assertThat(formation.getInscriptions()).doesNotContain(inscriptionBack);
        assertThat(inscriptionBack.getFormation()).isNull();

        formation.inscriptions(new HashSet<>(Set.of(inscriptionBack)));
        assertThat(formation.getInscriptions()).containsOnly(inscriptionBack);
        assertThat(inscriptionBack.getFormation()).isEqualTo(formation);

        formation.setInscriptions(new HashSet<>());
        assertThat(formation.getInscriptions()).doesNotContain(inscriptionBack);
        assertThat(inscriptionBack.getFormation()).isNull();
    }
}
