package com.sgsv.invmgmt.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ICTrayPlasticDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ICTrayPlasticDTO.class);
        ICTrayPlasticDTO iCTrayPlasticDTO1 = new ICTrayPlasticDTO();
        iCTrayPlasticDTO1.setId(1L);
        ICTrayPlasticDTO iCTrayPlasticDTO2 = new ICTrayPlasticDTO();
        assertThat(iCTrayPlasticDTO1).isNotEqualTo(iCTrayPlasticDTO2);
        iCTrayPlasticDTO2.setId(iCTrayPlasticDTO1.getId());
        assertThat(iCTrayPlasticDTO1).isEqualTo(iCTrayPlasticDTO2);
        iCTrayPlasticDTO2.setId(2L);
        assertThat(iCTrayPlasticDTO1).isNotEqualTo(iCTrayPlasticDTO2);
        iCTrayPlasticDTO1.setId(null);
        assertThat(iCTrayPlasticDTO1).isNotEqualTo(iCTrayPlasticDTO2);
    }
}
