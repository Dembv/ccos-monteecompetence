package dev.junior.ccos.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class FormationTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Formation getFormationSample1() {
        return new Formation().id(1L).codeFormation("codeFormation1").libelleFormation("libelleFormation1");
    }

    public static Formation getFormationSample2() {
        return new Formation().id(2L).codeFormation("codeFormation2").libelleFormation("libelleFormation2");
    }

    public static Formation getFormationRandomSampleGenerator() {
        return new Formation()
            .id(longCount.incrementAndGet())
            .codeFormation(UUID.randomUUID().toString())
            .libelleFormation(UUID.randomUUID().toString());
    }
}
