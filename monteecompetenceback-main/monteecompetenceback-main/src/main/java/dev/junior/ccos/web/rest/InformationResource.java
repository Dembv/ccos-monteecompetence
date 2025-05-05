package dev.junior.ccos.web.rest;

import dev.junior.ccos.repository.InformationRepository;
import dev.junior.ccos.service.InformationService;
import dev.junior.ccos.service.dto.InformationDTO;
import dev.junior.ccos.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link dev.junior.ccos.domain.Information}.
 */
@RestController
@RequestMapping("/api/information")
public class InformationResource {

    private final Logger log = LoggerFactory.getLogger(InformationResource.class);

    private static final String ENTITY_NAME = "information";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InformationService informationService;

    private final InformationRepository informationRepository;

    public InformationResource(InformationService informationService, InformationRepository informationRepository) {
        this.informationService = informationService;
        this.informationRepository = informationRepository;
    }

    /**
     * {@code POST  /information} : Create a new information.
     *
     * @param informationDTO the informationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new informationDTO, or with status {@code 400 (Bad Request)} if the information has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<InformationDTO> createInformation(@RequestBody InformationDTO informationDTO) throws URISyntaxException {
        log.debug("REST request to save Information : {}", informationDTO);
        if (informationDTO.getId() != null) {
            throw new BadRequestAlertException("A new information cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InformationDTO result = informationService.save(informationDTO);
        return ResponseEntity
            .created(new URI("/api/information/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /information/:id} : Updates an existing information.
     *
     * @param id the id of the informationDTO to save.
     * @param informationDTO the informationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated informationDTO,
     * or with status {@code 400 (Bad Request)} if the informationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the informationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<InformationDTO> updateInformation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody InformationDTO informationDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Information : {}, {}", id, informationDTO);
        if (informationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, informationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!informationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InformationDTO result = informationService.update(informationDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, informationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /information/:id} : Partial updates given fields of an existing information, field will ignore if it is null
     *
     * @param id the id of the informationDTO to save.
     * @param informationDTO the informationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated informationDTO,
     * or with status {@code 400 (Bad Request)} if the informationDTO is not valid,
     * or with status {@code 404 (Not Found)} if the informationDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the informationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InformationDTO> partialUpdateInformation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody InformationDTO informationDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Information partially : {}, {}", id, informationDTO);
        if (informationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, informationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!informationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InformationDTO> result = informationService.partialUpdate(informationDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, informationDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /information} : get all the information.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of information in body.
     */
    @GetMapping("")
    public ResponseEntity<List<InformationDTO>> getAllInformation(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Information");
        Page<InformationDTO> page = informationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /information/:id} : get the "id" information.
     *
     * @param id the id of the informationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the informationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<InformationDTO> getInformation(@PathVariable("id") Long id) {
        log.debug("REST request to get Information : {}", id);
        Optional<InformationDTO> informationDTO = informationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(informationDTO);
    }

    /**
     * {@code DELETE  /information/:id} : delete the "id" information.
     *
     * @param id the id of the informationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInformation(@PathVariable("id") Long id) {
        log.debug("REST request to delete Information : {}", id);
        informationService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
