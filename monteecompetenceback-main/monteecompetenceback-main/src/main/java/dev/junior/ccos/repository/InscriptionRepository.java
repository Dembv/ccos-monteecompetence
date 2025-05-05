package dev.junior.ccos.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.junior.ccos.domain.Inscription;
import dev.junior.ccos.service.dto.InscriptionInfoDTO;

/**
 * Spring Data JPA repository for the Inscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {
    @Query(
        "SELECT new dev.junior.ccos.service.dto.InscriptionInfoDTO(i.id, i.dateInscription, f.libelleFormation, n.libelle, a.annee) " +
        "FROM Inscription i " +
        "LEFT JOIN i.formation f " +
        "LEFT JOIN i.niveau n " +
        "LEFT JOIN i.anneeAcademique a " +
        "WHERE i.id = :id"
    )
    Optional<InscriptionInfoDTO> findInscriptionInfoById(@Param("id") Long id);

    @Query("SELECT i FROM Inscription i WHERE i.etudiant.id = :etudiantId")
    Page<Inscription> findByEtudiantId(@Param("etudiantId") Long etudiantId, Pageable pageable);
}
