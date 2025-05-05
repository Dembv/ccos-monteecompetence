package dev.junior.ccos.service.mapper;

import dev.junior.ccos.domain.Formation;
import dev.junior.ccos.service.dto.FormationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Formation} and its DTO {@link FormationDTO}.
 */
@Mapper(componentModel = "spring")
public interface FormationMapper extends EntityMapper<FormationDTO, Formation> {}
