package com.custom.lgk.htro.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.custom.lgk.htro.web.rest.TestUtil;

public class PortofoliuTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Portofoliu.class);
        Portofoliu portofoliu1 = new Portofoliu();
        portofoliu1.setId(1L);
        Portofoliu portofoliu2 = new Portofoliu();
        portofoliu2.setId(portofoliu1.getId());
        assertThat(portofoliu1).isEqualTo(portofoliu2);
        portofoliu2.setId(2L);
        assertThat(portofoliu1).isNotEqualTo(portofoliu2);
        portofoliu1.setId(null);
        assertThat(portofoliu1).isNotEqualTo(portofoliu2);
    }
}
