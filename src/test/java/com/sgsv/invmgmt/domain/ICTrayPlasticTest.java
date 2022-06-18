package com.sgsv.invmgmt.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ICTrayPlasticTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ICTrayPlastic.class);
        ICTrayPlastic iCTrayPlastic1 = new ICTrayPlastic();
        iCTrayPlastic1.setId(1L);
        ICTrayPlastic iCTrayPlastic2 = new ICTrayPlastic();
        iCTrayPlastic2.setId(iCTrayPlastic1.getId());
        assertThat(iCTrayPlastic1).isEqualTo(iCTrayPlastic2);
        iCTrayPlastic2.setId(2L);
        assertThat(iCTrayPlastic1).isNotEqualTo(iCTrayPlastic2);
        iCTrayPlastic1.setId(null);
        assertThat(iCTrayPlastic1).isNotEqualTo(iCTrayPlastic2);
    }
}
