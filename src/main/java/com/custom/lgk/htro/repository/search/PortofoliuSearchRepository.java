package com.custom.lgk.htro.repository.search;
import com.custom.lgk.htro.domain.Portofoliu;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Portofoliu} entity.
 */
public interface PortofoliuSearchRepository extends ElasticsearchRepository<Portofoliu, Long> {
}
