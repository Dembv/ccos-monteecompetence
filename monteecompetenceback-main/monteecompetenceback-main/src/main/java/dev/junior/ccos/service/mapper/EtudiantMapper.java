package dev.junior.ccos.service.mapper;

import dev.junior.ccos.domain.Etudiant;
import dev.junior.ccos.domain.User;
import dev.junior.ccos.service.dto.EtudiantDTO;
import dev.junior.ccos.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Etudiant} and its DTO {@link EtudiantDTO}.
 */
@Mapper(componentModel = "spring")
public interface EtudiantMapper extends EntityMapper<EtudiantDTO, Etudiant> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userBasic")
    EtudiantDTO toDto(Etudiant s);

    @Named("userBasic")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "email", source = "email")
    UserDTO toDtoUserBasic(User user);
}
