package com.custom.lgk.htro.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.custom.lgk.htro.web.rest.TestUtil;

public class StocTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stoc.class);
        Stoc stoc1 = new Stoc();
        stoc1.setId(1L);
        Stoc stoc2 = new Stoc();
        stoc2.setId(stoc1.getId());
        assertThat(stoc1).isEqualTo(stoc2);
        stoc2.setId(2L);
        assertThat(stoc1).isNotEqualTo(stoc2);
        stoc1.setId(null);
        assertThat(stoc1).isNotEqualTo(stoc2);
    }
}
