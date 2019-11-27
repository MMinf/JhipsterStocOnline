package com.custom.lgk.htro.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link DealerSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class DealerSearchRepositoryMockConfiguration {

    @MockBean
    private DealerSearchRepository mockDealerSearchRepository;

}
