package com.sgsv.invmgmt.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OutputBundleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OutputBundle.class);
        OutputBundle outputBundle1 = new OutputBundle();
        outputBundle1.setId(1L);
        OutputBundle outputBundle2 = new OutputBundle();
        outputBundle2.setId(outputBundle1.getId());
        assertThat(outputBundle1).isEqualTo(outputBundle2);
        outputBundle2.setId(2L);
        assertThat(outputBundle1).isNotEqualTo(outputBundle2);
        outputBundle1.setId(null);
        assertThat(outputBundle1).isNotEqualTo(outputBundle2);
    }
}
