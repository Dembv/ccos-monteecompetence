package dev.junior.ccos.service.mapper;

import dev.junior.ccos.domain.AnneeAcademique;
import dev.junior.ccos.service.dto.AnneeAcademiqueDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AnneeAcademique} and its DTO {@link AnneeAcademiqueDTO}.
 */
@Mapper(componentModel = "spring")
public interface AnneeAcademiqueMapper extends EntityMapper<AnneeAcademiqueDTO, AnneeAcademique> {}
