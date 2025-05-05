package dev.junior.ccos.service.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.junior.ccos.domain.AnneeAcademique;
import dev.junior.ccos.domain.Etudiant;
import dev.junior.ccos.domain.Formation;
import dev.junior.ccos.domain.Inscription;
import dev.junior.ccos.domain.Niveau;
import dev.junior.ccos.repository.AnneeAcademiqueRepository;
import dev.junior.ccos.repository.EtudiantRepository;
import dev.junior.ccos.repository.FormationRepository;
import dev.junior.ccos.repository.InscriptionRepository;
import dev.junior.ccos.repository.NiveauRepository;
import dev.junior.ccos.service.InscriptionService;
import dev.junior.ccos.service.dto.InscriptionDTO;
import dev.junior.ccos.service.dto.InscriptionInfoDTO;
import dev.junior.ccos.service.mapper.InscriptionMapper;
import jakarta.persistence.EntityNotFoundException;

/**
 * Service Implementation for managing {@link dev.junior.ccos.domain.Inscription}.
 */
@Service
@Transactional
public class InscriptionServiceImpl implements InscriptionService {

    private final Logger log = LoggerFactory.getLogger(InscriptionServiceImpl.class);

    private final InscriptionRepository inscriptionRepository;
    private final InscriptionMapper inscriptionMapper;
    private final EtudiantRepository etudiantRepository;
    private final NiveauRepository niveauRepository;
    private final AnneeAcademiqueRepository anneeAcademiqueRepository;
    private final FormationRepository formationRepository;

    public InscriptionServiceImpl(
        InscriptionRepository inscriptionRepository,
        InscriptionMapper inscriptionMapper,
        EtudiantRepository etudiantRepository,
        NiveauRepository niveauRepository,
        AnneeAcademiqueRepository anneeAcademiqueRepository,
        FormationRepository formationRepository
    ) {
        this.inscriptionRepository = inscriptionRepository;
        this.inscriptionMapper = inscriptionMapper;
        this.etudiantRepository = etudiantRepository;
        this.niveauRepository = niveauRepository;
        this.anneeAcademiqueRepository = anneeAcademiqueRepository;
        this.formationRepository = formationRepository;
    }

    @Override
    public InscriptionDTO save(InscriptionDTO inscriptionDTO) {
        log.debug("Request to save Inscription : {}", inscriptionDTO);

        Etudiant etudiant = etudiantRepository
            .findById(inscriptionDTO.getEtudiant().getId())
            .orElseThrow(() -> new EntityNotFoundException("Etudiant not found with id: " + inscriptionDTO.getEtudiant().getId()));

        Niveau niveau = niveauRepository
            .findById(inscriptionDTO.getNiveau().getId())
            .orElseThrow(() -> new EntityNotFoundException("Niveau not found with id: " + inscriptionDTO.getNiveau().getId()));

        AnneeAcademique anneeAcademique = anneeAcademiqueRepository
            .findById(inscriptionDTO.getAnneeAcademique().getId())
            .orElseThrow(() ->
                new EntityNotFoundException("AnneeAcademique not found with id: " + inscriptionDTO.getAnneeAcademique().getId())
            );

        Formation formation = formationRepository
            .findById(inscriptionDTO.getFormation().getId())
            .orElseThrow(() -> new EntityNotFoundException("Formation not found with id: " + inscriptionDTO.getFormation().getId()));

        Inscription inscription = inscriptionMapper.toEntity(inscriptionDTO);
        inscription.setEtudiant(etudiant);
        inscription.setNiveau(niveau);
        inscription.setAnneeAcademique(anneeAcademique);
        inscription.setFormation(formation);
        Inscription result = inscriptionRepository.save(inscription);
        return inscriptionMapper.toDto(result);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InscriptionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Inscriptions");
        return inscriptionRepository.findAll(pageable).map(inscriptionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InscriptionDTO> findOne(Long id) {
        log.debug("Request to get Inscription : {}", id);
        return inscriptionRepository.findById(id).map(inscriptionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Inscription : {}", id);
        inscriptionRepository.deleteById(id);
    }

    @Override
    public InscriptionDTO update(InscriptionDTO inscriptionDTO) {
        log.debug("Request to update Inscription : {}", inscriptionDTO);
        Inscription existingInscription = inscriptionRepository
            .findById(inscriptionDTO.getId())
            .orElseThrow(() -> new EntityNotFoundException("Inscription not found with id: " + inscriptionDTO.getId()));

        existingInscription.setDateInscription(inscriptionDTO.getDateInscription());

        if (inscriptionDTO.getEtudiant() != null && inscriptionDTO.getEtudiant().getId() != null) {
            Etudiant etudiant = etudiantRepository
                .findById(inscriptionDTO.getEtudiant().getId())
                .orElseThrow(() -> new EntityNotFoundException("Etudiant not found with id: " + inscriptionDTO.getEtudiant().getId()));
            existingInscription.setEtudiant(etudiant);
        }
        if (inscriptionDTO.getNiveau() != null && inscriptionDTO.getNiveau().getId() != null) {
            Niveau niveau = niveauRepository
                .findById(inscriptionDTO.getNiveau().getId())
                .orElseThrow(() -> new EntityNotFoundException("Niveau not found with id: " + inscriptionDTO.getNiveau().getId()));
            existingInscription.setNiveau(niveau);
        }
        if (inscriptionDTO.getAnneeAcademique() != null && inscriptionDTO.getAnneeAcademique().getId() != null) {
            AnneeAcademique anneeAcademique = anneeAcademiqueRepository
                .findById(inscriptionDTO.getAnneeAcademique().getId())
                .orElseThrow(() ->
                    new EntityNotFoundException("AnneeAcademique not found with id: " + inscriptionDTO.getAnneeAcademique().getId())
                );
            existingInscription.setAnneeAcademique(anneeAcademique);
        }
        if (inscriptionDTO.getFormation() != null && inscriptionDTO.getFormation().getId() != null) {
            Formation formation = formationRepository
                .findById(inscriptionDTO.getFormation().getId())
                .orElseThrow(() -> new EntityNotFoundException("Formation not found with id: " + inscriptionDTO.getFormation().getId()));
            existingInscription.setFormation(formation);
        }

        Inscription updatedInscription = inscriptionRepository.save(existingInscription);
        return inscriptionMapper.toDto(updatedInscription);
    }

    @Override
    public Optional<InscriptionDTO> partialUpdate(InscriptionDTO inscriptionDTO) {
        log.debug("Request to partially update Inscription : {}", inscriptionDTO);

        return inscriptionRepository
            .findById(inscriptionDTO.getId())
            .map(existingInscription -> {
                inscriptionMapper.partialUpdate(existingInscription, inscriptionDTO);

                if (inscriptionDTO.getDateInscription() != null) {
                    existingInscription.setDateInscription(inscriptionDTO.getDateInscription());
                }

                if (inscriptionDTO.getEtudiant() != null && inscriptionDTO.getEtudiant().getId() != null) {
                    Etudiant etudiant = etudiantRepository
                        .findById(inscriptionDTO.getEtudiant().getId())
                        .orElseThrow(() ->
                            new EntityNotFoundException("Etudiant not found with id: " + inscriptionDTO.getEtudiant().getId())
                        );
                    existingInscription.setEtudiant(etudiant);
                }

                if (inscriptionDTO.getNiveau() != null && inscriptionDTO.getNiveau().getId() != null) {
                    Niveau niveau = niveauRepository
                        .findById(inscriptionDTO.getNiveau().getId())
                        .orElseThrow(() -> new EntityNotFoundException("Niveau not found with id: " + inscriptionDTO.getNiveau().getId()));
                    existingInscription.setNiveau(niveau);
                }

                if (inscriptionDTO.getAnneeAcademique() != null && inscriptionDTO.getAnneeAcademique().getId() != null) {
                    AnneeAcademique anneeAcademique = anneeAcademiqueRepository
                        .findById(inscriptionDTO.getAnneeAcademique().getId())
                        .orElseThrow(() ->
                            new EntityNotFoundException("AnneeAcademique not found with id: " + inscriptionDTO.getAnneeAcademique().getId())
                        );
                    existingInscription.setAnneeAcademique(anneeAcademique);
                }

                if (inscriptionDTO.getFormation() != null && inscriptionDTO.getFormation().getId() != null) {
                    Formation formation = formationRepository
                        .findById(inscriptionDTO.getFormation().getId())
                        .orElseThrow(() ->
                            new EntityNotFoundException("Formation not found with id: " + inscriptionDTO.getFormation().getId())
                        );
                    existingInscription.setFormation(formation);
                }

                Inscription updatedInscription = inscriptionRepository.save(existingInscription);
                return inscriptionMapper.toDto(updatedInscription);
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InscriptionInfoDTO> getInscriptionInfoDirect(Long id) {
        log.debug("Request to get detailed information for Inscription with ID directly from repository : {}", id);
        return inscriptionRepository.findInscriptionInfoById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InscriptionDTO> findAllByEtudiant(Long etudiantId, Pageable pageable) {
        log.debug("Request to get all Inscriptions for Etudiant with ID : {}", etudiantId);
        return inscriptionRepository.findByEtudiantId(etudiantId, pageable).map(inscriptionMapper::toDto);
    }
}
