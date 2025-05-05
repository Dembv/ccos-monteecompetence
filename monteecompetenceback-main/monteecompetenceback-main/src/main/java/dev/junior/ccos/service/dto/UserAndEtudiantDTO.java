package dev.junior.ccos.service.dto;

import java.io.Serializable;

public class UserAndEtudiantDTO {

    private UserDTO userDTO;
    private EtudiantDTO etudiantDTO;

    // Getter pour userDTO
    public UserDTO getUserDTO() {
        return userDTO;
    }

    // Setter pour userDTO
    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    // Getter pour etudiantDTO
    public EtudiantDTO getEtudiantDTO() {
        return etudiantDTO;
    }

    // Setter pour etudiantDTO
    public void setEtudiantDTO(EtudiantDTO etudiantDTO) {
        this.etudiantDTO = etudiantDTO;
    }
}
