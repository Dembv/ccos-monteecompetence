package dev.junior.ccos.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class EtudiantTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Etudiant getEtudiantSample1() {
        return new Etudiant()
            .id(1L)
            .codeEtudiant("codeEtudiant1")
            .telephone("telephone1")
            .emailPersonnel("emailPersonnel1")
            .adresse("adresse1");
    }

    public static Etudiant getEtudiantSample2() {
        return new Etudiant()
            .id(2L)
            .codeEtudiant("codeEtudiant2")
            .telephone("telephone2")
            .emailPersonnel("emailPersonnel2")
            .adresse("adresse2");
    }

    public static Etudiant getEtudiantRandomSampleGenerator() {
        return new Etudiant()
            .id(longCount.incrementAndGet())
            .codeEtudiant(UUID.randomUUID().toString())
            .telephone(UUID.randomUUID().toString())
            .emailPersonnel(UUID.randomUUID().toString())
            .adresse(UUID.randomUUID().toString());
    }
}
