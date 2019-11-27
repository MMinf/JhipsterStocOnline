package com.custom.lgk.htro.repository.search;
import com.custom.lgk.htro.domain.Stoc;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Stoc} entity.
 */
public interface StocSearchRepository extends ElasticsearchRepository<Stoc, Long> {
}
