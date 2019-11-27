package com.custom.lgk.htro.repository.search;
import com.custom.lgk.htro.domain.ExtendedUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ExtendedUser} entity.
 */
public interface ExtendedUserSearchRepository extends ElasticsearchRepository<ExtendedUser, Long> {
}
