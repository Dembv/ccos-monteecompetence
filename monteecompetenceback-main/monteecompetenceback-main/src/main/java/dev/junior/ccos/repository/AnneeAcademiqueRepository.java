package dev.junior.ccos.repository;

import dev.junior.ccos.domain.AnneeAcademique;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AnneeAcademique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnneeAcademiqueRepository extends JpaRepository<AnneeAcademique, Long> {}
