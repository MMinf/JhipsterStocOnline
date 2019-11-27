package com.custom.lgk.htro.web.rest;

import com.custom.lgk.htro.domain.Portofoliu;
import com.custom.lgk.htro.repository.PortofoliuRepository;
import com.custom.lgk.htro.repository.search.PortofoliuSearchRepository;
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
 * REST controller for managing {@link com.custom.lgk.htro.domain.Portofoliu}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PortofoliuResource {

    private final Logger log = LoggerFactory.getLogger(PortofoliuResource.class);

    private static final String ENTITY_NAME = "portofoliu";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PortofoliuRepository portofoliuRepository;

    private final PortofoliuSearchRepository portofoliuSearchRepository;

    public PortofoliuResource(PortofoliuRepository portofoliuRepository, PortofoliuSearchRepository portofoliuSearchRepository) {
        this.portofoliuRepository = portofoliuRepository;
        this.portofoliuSearchRepository = portofoliuSearchRepository;
    }

    /**
     * {@code POST  /portofolius} : Create a new portofoliu.
     *
     * @param portofoliu the portofoliu to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new portofoliu, or with status {@code 400 (Bad Request)} if the portofoliu has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/portofolius")
    public ResponseEntity<Portofoliu> createPortofoliu(@RequestBody Portofoliu portofoliu) throws URISyntaxException {
        log.debug("REST request to save Portofoliu : {}", portofoliu);
        if (portofoliu.getId() != null) {
            throw new BadRequestAlertException("A new portofoliu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Portofoliu result = portofoliuRepository.save(portofoliu);
        portofoliuSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/portofolius/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /portofolius} : Updates an existing portofoliu.
     *
     * @param portofoliu the portofoliu to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated portofoliu,
     * or with status {@code 400 (Bad Request)} if the portofoliu is not valid,
     * or with status {@code 500 (Internal Server Error)} if the portofoliu couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/portofolius")
    public ResponseEntity<Portofoliu> updatePortofoliu(@RequestBody Portofoliu portofoliu) throws URISyntaxException {
        log.debug("REST request to update Portofoliu : {}", portofoliu);
        if (portofoliu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Portofoliu result = portofoliuRepository.save(portofoliu);
        portofoliuSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, portofoliu.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /portofolius} : get all the portofolius.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of portofolius in body.
     */
    @GetMapping("/portofolius")
    public ResponseEntity<List<Portofoliu>> getAllPortofolius(Pageable pageable) {
        log.debug("REST request to get a page of Portofolius");
        Page<Portofoliu> page = portofoliuRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /portofolius/:id} : get the "id" portofoliu.
     *
     * @param id the id of the portofoliu to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the portofoliu, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/portofolius/{id}")
    public ResponseEntity<Portofoliu> getPortofoliu(@PathVariable Long id) {
        log.debug("REST request to get Portofoliu : {}", id);
        Optional<Portofoliu> portofoliu = portofoliuRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(portofoliu);
    }

    /**
     * {@code DELETE  /portofolius/:id} : delete the "id" portofoliu.
     *
     * @param id the id of the portofoliu to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/portofolius/{id}")
    public ResponseEntity<Void> deletePortofoliu(@PathVariable Long id) {
        log.debug("REST request to delete Portofoliu : {}", id);
        portofoliuRepository.deleteById(id);
        portofoliuSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/portofolius?query=:query} : search for the portofoliu corresponding
     * to the query.
     *
     * @param query the query of the portofoliu search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/portofolius")
    public ResponseEntity<List<Portofoliu>> searchPortofolius(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Portofolius for query {}", query);
        Page<Portofoliu> page = portofoliuSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
