package dev.junior.ccos.service.mapper;

import dev.junior.ccos.domain.AnneeAcademique;
import dev.junior.ccos.domain.Etudiant;
import dev.junior.ccos.domain.Formation;
import dev.junior.ccos.domain.Inscription;
import dev.junior.ccos.domain.Niveau;
import dev.junior.ccos.service.dto.AnneeAcademiqueDTO;
import dev.junior.ccos.service.dto.EtudiantDTO;
import dev.junior.ccos.service.dto.FormationDTO;
import dev.junior.ccos.service.dto.InscriptionDTO;
import dev.junior.ccos.service.dto.NiveauDTO;
import dev.junior.ccos.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Inscription} and its DTO {@link InscriptionDTO} with embedded entities.
 */
@Mapper(componentModel = "spring")
public interface InscriptionMapper extends EntityMapper<InscriptionDTO, Inscription> {
    @Mapping(target = "etudiant", source = "etudiant", qualifiedByName = "toEtudiantDTO")
    @Mapping(target = "niveau", source = "niveau", qualifiedByName = "toNiveauDTO")
    @Mapping(target = "anneeAcademique", source = "anneeAcademique", qualifiedByName = "toAnneeAcademiqueDTO")
    @Mapping(target = "formation", source = "formation", qualifiedByName = "toFormationDTO")
    InscriptionDTO toDto(Inscription inscription);

    @Mapping(target = "etudiant", source = "etudiant")
    @Mapping(target = "niveau", source = "niveau")
    @Mapping(target = "anneeAcademique", source = "anneeAcademique")
    @Mapping(target = "formation", source = "formation")
    Inscription toEntity(InscriptionDTO inscriptionDTO);

    @Mapping(target = "etudiant", ignore = true)
    @Mapping(target = "niveau", ignore = true)
    @Mapping(target = "anneeAcademique", ignore = true)
    @Mapping(target = "formation", ignore = true)
    @Mapping(target = "id", ignore = true)
    void partialUpdate(@MappingTarget Inscription entity, InscriptionDTO dto);

    default Inscription fromId(Long id) {
        if (id == null) {
            return null;
        }
        Inscription inscription = new Inscription();
        inscription.setId(id);
        return inscription;
    }

    @Named("toEtudiantDTO")
    default EtudiantDTO toEtudiantDTO(Etudiant etudiant) {
        if (etudiant == null) {
            return null;
        }
        EtudiantDTO dto = new EtudiantDTO();
        dto.setId(etudiant.getId());
        dto.setCodeEtudiant(etudiant.getCodeEtudiant());
        dto.setTelephone(etudiant.getTelephone());
        dto.setEmailPersonnel(etudiant.getEmailPersonnel());
        dto.setAdresse(etudiant.getAdresse());
        dto.setSexe(etudiant.getSexe());
        dto.setDateNaissance(etudiant.getDateNaissance());
        if (etudiant.getUser() != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(etudiant.getUser().getId());
            userDTO.setLogin(etudiant.getUser().getLogin());
            userDTO.setFirstName(etudiant.getUser().getFirstName());
            userDTO.setLastName(etudiant.getUser().getLastName());
            userDTO.setEmail(etudiant.getUser().getEmail());
            dto.setUser(userDTO);
        }
        return dto;
    }

    @Named("toNiveauDTO")
    default NiveauDTO toNiveauDTO(Niveau niveau) {
        if (niveau == null) {
            return null;
        }
        NiveauDTO dto = new NiveauDTO();
        dto.setId(niveau.getId());
        dto.setCodeNiveau(niveau.getCodeNiveau());
        dto.setLibelle(niveau.getLibelle());
        return dto;
    }

    @Named("toAnneeAcademiqueDTO")
    default AnneeAcademiqueDTO toAnneeAcademiqueDTO(AnneeAcademique anneeAcademique) {
        if (anneeAcademique == null) {
            return null;
        }
        AnneeAcademiqueDTO dto = new AnneeAcademiqueDTO();
        dto.setId(anneeAcademique.getId());
        dto.setAnnee(anneeAcademique.getAnnee());
        return dto;
    }

    @Named("toFormationDTO")
    default FormationDTO toFormationDTO(Formation formation) {
        if (formation == null) {
            return null;
        }
        FormationDTO dto = new FormationDTO();
        dto.setId(formation.getId());
        dto.setCodeFormation(formation.getCodeFormation());
        dto.setLibelleFormation(formation.getLibelleFormation());
        return dto;
    }
}
