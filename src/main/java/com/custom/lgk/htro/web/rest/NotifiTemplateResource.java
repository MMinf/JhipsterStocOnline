package com.custom.lgk.htro.web.rest;

import com.custom.lgk.htro.domain.NotifiTemplate;
import com.custom.lgk.htro.repository.NotifiTemplateRepository;
import com.custom.lgk.htro.repository.search.NotifiTemplateSearchRepository;
import com.custom.lgk.htro.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.custom.lgk.htro.domain.NotifiTemplate}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NotifiTemplateResource {

    private final Logger log = LoggerFactory.getLogger(NotifiTemplateResource.class);

    private static final String ENTITY_NAME = "notifiTemplate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NotifiTemplateRepository notifiTemplateRepository;

    private final NotifiTemplateSearchRepository notifiTemplateSearchRepository;

    public NotifiTemplateResource(NotifiTemplateRepository notifiTemplateRepository, NotifiTemplateSearchRepository notifiTemplateSearchRepository) {
        this.notifiTemplateRepository = notifiTemplateRepository;
        this.notifiTemplateSearchRepository = notifiTemplateSearchRepository;
    }

    /**
     * {@code POST  /notifi-templates} : Create a new notifiTemplate.
     *
     * @param notifiTemplate the notifiTemplate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new notifiTemplate, or with status {@code 400 (Bad Request)} if the notifiTemplate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/notifi-templates")
    public ResponseEntity<NotifiTemplate> createNotifiTemplate(@Valid @RequestBody NotifiTemplate notifiTemplate) throws URISyntaxException {
        log.debug("REST request to save NotifiTemplate : {}", notifiTemplate);
        if (notifiTemplate.getId() != null) {
            throw new BadRequestAlertException("A new notifiTemplate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NotifiTemplate result = notifiTemplateRepository.save(notifiTemplate);
        notifiTemplateSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/notifi-templates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /notifi-templates} : Updates an existing notifiTemplate.
     *
     * @param notifiTemplate the notifiTemplate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated notifiTemplate,
     * or with status {@code 400 (Bad Request)} if the notifiTemplate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the notifiTemplate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/notifi-templates")
    public ResponseEntity<NotifiTemplate> updateNotifiTemplate(@Valid @RequestBody NotifiTemplate notifiTemplate) throws URISyntaxException {
        log.debug("REST request to update NotifiTemplate : {}", notifiTemplate);
        if (notifiTemplate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NotifiTemplate result = notifiTemplateRepository.save(notifiTemplate);
        notifiTemplateSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, notifiTemplate.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /notifi-templates} : get all the notifiTemplates.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of notifiTemplates in body.
     */
    @GetMapping("/notifi-templates")
    public List<NotifiTemplate> getAllNotifiTemplates() {
        log.debug("REST request to get all NotifiTemplates");
        return notifiTemplateRepository.findAll();
    }

    /**
     * {@code GET  /notifi-templates/:id} : get the "id" notifiTemplate.
     *
     * @param id the id of the notifiTemplate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the notifiTemplate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/notifi-templates/{id}")
    public ResponseEntity<NotifiTemplate> getNotifiTemplate(@PathVariable Long id) {
        log.debug("REST request to get NotifiTemplate : {}", id);
        Optional<NotifiTemplate> notifiTemplate = notifiTemplateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(notifiTemplate);
    }

    /**
     * {@code DELETE  /notifi-templates/:id} : delete the "id" notifiTemplate.
     *
     * @param id the id of the notifiTemplate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/notifi-templates/{id}")
    public ResponseEntity<Void> deleteNotifiTemplate(@PathVariable Long id) {
        log.debug("REST request to delete NotifiTemplate : {}", id);
        notifiTemplateRepository.deleteById(id);
        notifiTemplateSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/notifi-templates?query=:query} : search for the notifiTemplate corresponding
     * to the query.
     *
     * @param query the query of the notifiTemplate search.
     * @return the result of the search.
     */
    @GetMapping("/_search/notifi-templates")
    public List<NotifiTemplate> searchNotifiTemplates(@RequestParam String query) {
        log.debug("REST request to search NotifiTemplates for query {}", query);
        return StreamSupport
            .stream(notifiTemplateSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
