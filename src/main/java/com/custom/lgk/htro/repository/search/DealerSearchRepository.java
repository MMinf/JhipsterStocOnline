package com.custom.lgk.htro.repository.search;
import com.custom.lgk.htro.domain.Dealer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Dealer} entity.
 */
public interface DealerSearchRepository extends ElasticsearchRepository<Dealer, Long> {
}
