package dev.junior.ccos.service.mapper;

import dev.junior.ccos.domain.Niveau;
import dev.junior.ccos.service.dto.NiveauDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Niveau} and its DTO {@link NiveauDTO}.
 */
@Mapper(componentModel = "spring")
public interface NiveauMapper extends EntityMapper<NiveauDTO, Niveau> {}
