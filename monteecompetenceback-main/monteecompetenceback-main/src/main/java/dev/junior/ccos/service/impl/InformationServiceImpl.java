package dev.junior.ccos.service.impl;

import dev.junior.ccos.domain.Information;
import dev.junior.ccos.repository.InformationRepository;
import dev.junior.ccos.service.InformationService;
import dev.junior.ccos.service.dto.InformationDTO;
import dev.junior.ccos.service.mapper.InformationMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link dev.junior.ccos.domain.Information}.
 */
@Service
@Transactional
public class InformationServiceImpl implements InformationService {

    private final Logger log = LoggerFactory.getLogger(InformationServiceImpl.class);

    private final InformationRepository informationRepository;

    private final InformationMapper informationMapper;

    public InformationServiceImpl(InformationRepository informationRepository, InformationMapper informationMapper) {
        this.informationRepository = informationRepository;
        this.informationMapper = informationMapper;
    }

    @Override
    public InformationDTO save(InformationDTO informationDTO) {
        log.debug("Request to save Information : {}", informationDTO);
        Information information = informationMapper.toEntity(informationDTO);
        information = informationRepository.save(information);
        return informationMapper.toDto(information);
    }

    @Override
    public InformationDTO update(InformationDTO informationDTO) {
        log.debug("Request to update Information : {}", informationDTO);
        Information information = informationMapper.toEntity(informationDTO);
        information = informationRepository.save(information);
        return informationMapper.toDto(information);
    }

    @Override
    public Optional<InformationDTO> partialUpdate(InformationDTO informationDTO) {
        log.debug("Request to partially update Information : {}", informationDTO);

        return informationRepository
            .findById(informationDTO.getId())
            .map(existingInformation -> {
                informationMapper.partialUpdate(existingInformation, informationDTO);

                return existingInformation;
            })
            .map(informationRepository::save)
            .map(informationMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InformationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Information");
        return informationRepository.findAll(pageable).map(informationMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InformationDTO> findOne(Long id) {
        log.debug("Request to get Information : {}", id);
        return informationRepository.findById(id).map(informationMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Information : {}", id);
        informationRepository.deleteById(id);
    }
}
