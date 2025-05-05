package dev.junior.ccos.service.impl;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.junior.ccos.domain.Etudiant;
import dev.junior.ccos.domain.User;
import dev.junior.ccos.repository.EtudiantRepository;
import dev.junior.ccos.repository.UserRepository;
import dev.junior.ccos.service.EtudiantService;
import dev.junior.ccos.service.MailService;
import dev.junior.ccos.service.UserService;
import dev.junior.ccos.service.dto.AdminUserDTO;
import dev.junior.ccos.service.dto.EtudiantDTO;
import dev.junior.ccos.service.mapper.EtudiantMapper;
import dev.junior.ccos.service.mapper.UserMapper;

/**
 * Service Implementation for managing {@link dev.junior.ccos.domain.Etudiant}.
 */
@Service
@Transactional
public class EtudiantServiceImpl implements EtudiantService {

    private final Logger log = LoggerFactory.getLogger(EtudiantServiceImpl.class);

    private final EtudiantRepository etudiantRepository;

    private final EtudiantMapper etudiantMapper;
    private final UserService userService;
    private final UserRepository userRepository;
    private final UserMapper userMappper;

    private MailService mailService;

    public EtudiantServiceImpl(
        EtudiantRepository etudiantRepository,
        EtudiantMapper etudiantMapper,
        UserService userService,
        UserRepository userRepository,
        final UserMapper userMappper,
        MailService mailService
    ) {
        this.etudiantRepository = etudiantRepository;
        this.etudiantMapper = etudiantMapper;
        this.userService = userService;
        this.userRepository = userRepository;
        this.userMappper = userMappper;
        this.mailService = mailService;
    }

    @Override
    @Transactional
    public EtudiantDTO save(EtudiantDTO etudiantDTO) {
        // Supprimer les accents et lier les prénoms
        String firstName = deleteBlank(etudiantDTO.getUser().getFirstName());
        String lastName = deleteAccent(etudiantDTO.getUser().getLastName());

        // création de l'email institutionnel
        String email = lastName.toLowerCase() + "." + firstName.toLowerCase() + "@ugb.edu.sn";
        //generer le login
        String login = genererLogin(firstName, lastName);
        // Créer le user
        AdminUserDTO adminUserDTO = new AdminUserDTO();
        adminUserDTO.setLogin(login);
        adminUserDTO.setEmail(email); //email avec les accents  et espaces surppimés
        adminUserDTO.setFirstName(etudiantDTO.getUser().getFirstName());
        adminUserDTO.setLastName(etudiantDTO.getUser().getLastName());
        adminUserDTO.setAuthorities(Set.of("ROLE_USER"));

        dev.junior.ccos.domain.User user = userService.createUser(adminUserDTO);
        if (user == null) {
            throw new IllegalStateException("Échec de création de l'utilisateur");
        }

        // Créer l'étudiant
        log.debug("Request to save Etudiant : {}", etudiantDTO);
        Etudiant etudiant = etudiantMapper.toEntity(etudiantDTO);
        etudiant.setUser(user);
        etudiant = etudiantRepository.save(etudiant);

        this.mailService.sendPasswordResetMail(etudiant.getUser());

        return etudiantMapper.toDto(etudiant);
    }

    // Supprime les accents
    private String deleteAccent(String input) {
        return input == null
            ? ""
            : Normalizer
                .normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "") // supprime les caractères diacritiques (accents)
                .replaceAll("[^\\p{ASCII}]", "");
    }

    // Supprime les accents et lie les prénoms multiples par des tirets
    private String deleteBlank(String input) {
        if (input == null) return "";
        String[] parts = input.trim().split("\\s+"); // sépare les prénoms
        return Arrays.stream(parts).map(this::deleteAccent).collect(Collectors.joining("-"));
    }

    //genertion login
    public String genererLogin(String prenom, String nom) {
        String[] prenoms = prenom.trim().split("\\s+");
        String login;

        if (prenoms.length > 1) {
            login = prenoms[0] + "-" + prenoms[1] + "-" + nom;
        } else {
            login = prenoms[0] + "-" + nom;
        }

        return login.toLowerCase().replaceAll("[^a-z0-9-]", "");
    }

    @Override
    public EtudiantDTO update(EtudiantDTO etudiantDTO) {
        // Mettre à jour le user en premier
        String firstName = deleteBlank(etudiantDTO.getUser().getFirstName());
        String lastName = deleteAccent(etudiantDTO.getUser().getLastName());

        // Création de l'email institutionnel
        String email = lastName.toLowerCase() + "." + firstName.toLowerCase() + "@ugb.edu.sn";

        //generer le login
        String login = genererLogin(firstName, lastName);

        // Créer le user
        AdminUserDTO adminUserDTO = new AdminUserDTO();
        adminUserDTO.setId(etudiantDTO.getUser().getId());
        adminUserDTO.setLogin(login);
        adminUserDTO.setEmail(email);
        adminUserDTO.setFirstName(etudiantDTO.getUser().getFirstName());
        adminUserDTO.setLastName(etudiantDTO.getUser().getLastName());
        adminUserDTO.setAuthorities(Set.of("ROLE_USER"));

        // Mise à jour du user (avec gestion de l'Optional)
        AdminUserDTO user = userService
            .updateUser(adminUserDTO)
            .orElseThrow(() -> new RuntimeException("Erreur lors de la mise à jour de l'utilisateur"));

        log.debug("Request to update Etudiant : {}", etudiantDTO);
        //recuper l'utilisateur retourne et creer un autre
        User userupdated = new User();
        userupdated.setId(user.getId());
        userupdated.setLogin(user.getLogin());
        userupdated.setFirstName(user.getFirstName());
        userupdated.setLastName(user.getLastName());
        userupdated.setEmail(user.getEmail());

        Etudiant etudiant = etudiantMapper.toEntity(etudiantDTO);
        //ajouter le user a etudiant
        etudiant.setUser(userupdated);
        etudiant = etudiantRepository.save(etudiant);
        return etudiantMapper.toDto(etudiant);
    }

    @Override
    public Optional<EtudiantDTO> partialUpdate(EtudiantDTO etudiantDTO) {
        log.debug("Request to partially update Etudiant : {}", etudiantDTO);

        return etudiantRepository
            .findById(etudiantDTO.getId())
            .map(existingEtudiant -> {
                etudiantMapper.partialUpdate(existingEtudiant, etudiantDTO);

                return existingEtudiant;
            })
            .map(etudiantRepository::save)
            .map(etudiantMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EtudiantDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Etudiants");
        return etudiantRepository.findAll(pageable).map(etudiantMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EtudiantDTO> findOne(Long id) {
        log.debug("Request to get Etudiant : {}", id);
        return etudiantRepository.findById(id).map(etudiantMapper::toDto);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        log.debug("Request to delete Etudiant : {}", id);

        Optional<Etudiant> etudiantOpt = etudiantRepository.findById(id);

        etudiantOpt.ifPresent(etudiant -> {
            User user = etudiant.getUser();
            if (user != null) {
                // Supprimer les rôles de l'utilisateur
                userRepository.deleteUserAuthorities(user.getId());

                // Supprimer l'utilisateur
                userRepository.delete(user);

                // Vider les caches si nécessaires
            }

            // Supprimer l'étudiant
            etudiantRepository.delete(etudiant);
            log.debug("Deleted Etudiant and associated User: {}", id);
        });
    }

    @Override
public Optional<EtudiantDTO> findByUserId(Long userId) {
    return etudiantRepository.findOneByUserId(userId).map(etudiantMapper::toDto);
}

}
