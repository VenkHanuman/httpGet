package com.sgsv.invmgmt.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DestinationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Destination.class);
        Destination destination1 = new Destination();
        destination1.setId(1L);
        Destination destination2 = new Destination();
        destination2.setId(destination1.getId());
        assertThat(destination1).isEqualTo(destination2);
        destination2.setId(2L);
        assertThat(destination1).isNotEqualTo(destination2);
        destination1.setId(null);
        assertThat(destination1).isNotEqualTo(destination2);
    }
}
