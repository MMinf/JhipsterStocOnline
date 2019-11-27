package com.custom.lgk.htro.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.custom.lgk.htro.web.rest.TestUtil;

public class NotifiTemplateTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NotifiTemplate.class);
        NotifiTemplate notifiTemplate1 = new NotifiTemplate();
        notifiTemplate1.setId(1L);
        NotifiTemplate notifiTemplate2 = new NotifiTemplate();
        notifiTemplate2.setId(notifiTemplate1.getId());
        assertThat(notifiTemplate1).isEqualTo(notifiTemplate2);
        notifiTemplate2.setId(2L);
        assertThat(notifiTemplate1).isNotEqualTo(notifiTemplate2);
        notifiTemplate1.setId(null);
        assertThat(notifiTemplate1).isNotEqualTo(notifiTemplate2);
    }
}
