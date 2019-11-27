package com.custom.lgk.htro.repository.search;
import com.custom.lgk.htro.domain.NotifiTemplate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link NotifiTemplate} entity.
 */
public interface NotifiTemplateSearchRepository extends ElasticsearchRepository<NotifiTemplate, Long> {
}
