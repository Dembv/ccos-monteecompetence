package dev.junior.ccos.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class AnneeAcademiqueTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static AnneeAcademique getAnneeAcademiqueSample1() {
        return new AnneeAcademique().id(1L).annee("annee1");
    }

    public static AnneeAcademique getAnneeAcademiqueSample2() {
        return new AnneeAcademique().id(2L).annee("annee2");
    }

    public static AnneeAcademique getAnneeAcademiqueRandomSampleGenerator() {
        return new AnneeAcademique().id(longCount.incrementAndGet()).annee(UUID.randomUUID().toString());
    }
}
