package dev.junior.ccos.service.mapper;

import dev.junior.ccos.domain.Information;
import dev.junior.ccos.service.dto.InformationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Information} and its DTO {@link InformationDTO}.
 */
@Mapper(componentModel = "spring")
public interface InformationMapper extends EntityMapper<InformationDTO, Information> {}
