package com.custom.lgk.htro.web.rest;

import com.custom.lgk.htro.domain.Stoc;
import com.custom.lgk.htro.repository.StocRepository;
import com.custom.lgk.htro.repository.search.StocSearchRepository;
import com.custom.lgk.htro.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.custom.lgk.htro.domain.Stoc}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StocResource {

    private final Logger log = LoggerFactory.getLogger(StocResource.class);

    private static final String ENTITY_NAME = "stoc";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StocRepository stocRepository;

    private final StocSearchRepository stocSearchRepository;

    public StocResource(StocRepository stocRepository, StocSearchRepository stocSearchRepository) {
        this.stocRepository = stocRepository;
        this.stocSearchRepository = stocSearchRepository;
    }

    /**
     * {@code POST  /stocs} : Create a new stoc.
     *
     * @param stoc the stoc to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new stoc, or with status {@code 400 (Bad Request)} if the stoc has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stocs")
    public ResponseEntity<Stoc> createStoc(@RequestBody Stoc stoc) throws URISyntaxException {
        log.debug("REST request to save Stoc : {}", stoc);
        if (stoc.getId() != null) {
            throw new BadRequestAlertException("A new stoc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Stoc result = stocRepository.save(stoc);
        stocSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/stocs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stocs} : Updates an existing stoc.
     *
     * @param stoc the stoc to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stoc,
     * or with status {@code 400 (Bad Request)} if the stoc is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stoc couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stocs")
    public ResponseEntity<Stoc> updateStoc(@RequestBody Stoc stoc) throws URISyntaxException {
        log.debug("REST request to update Stoc : {}", stoc);
        if (stoc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Stoc result = stocRepository.save(stoc);
        stocSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stoc.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /stocs} : get all the stocs.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stocs in body.
     */
    @GetMapping("/stocs")
    public ResponseEntity<List<Stoc>> getAllStocs(Pageable pageable) {
        log.debug("REST request to get a page of Stocs");
        Page<Stoc> page = stocRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /stocs/:id} : get the "id" stoc.
     *
     * @param id the id of the stoc to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stoc, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stocs/{id}")
    public ResponseEntity<Stoc> getStoc(@PathVariable Long id) {
        log.debug("REST request to get Stoc : {}", id);
        Optional<Stoc> stoc = stocRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stoc);
    }

    /**
     * {@code DELETE  /stocs/:id} : delete the "id" stoc.
     *
     * @param id the id of the stoc to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stocs/{id}")
    public ResponseEntity<Void> deleteStoc(@PathVariable Long id) {
        log.debug("REST request to delete Stoc : {}", id);
        stocRepository.deleteById(id);
        stocSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/stocs?query=:query} : search for the stoc corresponding
     * to the query.
     *
     * @param query the query of the stoc search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/stocs")
    public ResponseEntity<List<Stoc>> searchStocs(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Stocs for query {}", query);
        Page<Stoc> page = stocSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
