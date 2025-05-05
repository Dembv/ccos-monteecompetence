package dev.junior.ccos.domain;

import static dev.junior.ccos.domain.InscriptionTestSamples.*;
import static dev.junior.ccos.domain.NiveauTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import dev.junior.ccos.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class NiveauTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Niveau.class);
        Niveau niveau1 = getNiveauSample1();
        Niveau niveau2 = new Niveau();
        assertThat(niveau1).isNotEqualTo(niveau2);

        niveau2.setId(niveau1.getId());
        assertThat(niveau1).isEqualTo(niveau2);

        niveau2 = getNiveauSample2();
        assertThat(niveau1).isNotEqualTo(niveau2);
    }

    @Test
    void inscriptionsTest() throws Exception {
        Niveau niveau = getNiveauRandomSampleGenerator();
        Inscription inscriptionBack = getInscriptionRandomSampleGenerator();

        niveau.addInscriptions(inscriptionBack);
        assertThat(niveau.getInscriptions()).containsOnly(inscriptionBack);
        assertThat(inscriptionBack.getNiveau()).isEqualTo(niveau);

        niveau.removeInscriptions(inscriptionBack);
        assertThat(niveau.getInscriptions()).doesNotContain(inscriptionBack);
        assertThat(inscriptionBack.getNiveau()).isNull();

        niveau.inscriptions(new HashSet<>(Set.of(inscriptionBack)));
        assertThat(niveau.getInscriptions()).containsOnly(inscriptionBack);
        assertThat(inscriptionBack.getNiveau()).isEqualTo(niveau);

        niveau.setInscriptions(new HashSet<>());
        assertThat(niveau.getInscriptions()).doesNotContain(inscriptionBack);
        assertThat(inscriptionBack.getNiveau()).isNull();
    }
}
