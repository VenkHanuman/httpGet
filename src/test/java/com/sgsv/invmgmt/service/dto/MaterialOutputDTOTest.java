package com.sgsv.invmgmt.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MaterialOutputDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaterialOutputDTO.class);
        MaterialOutputDTO materialOutputDTO1 = new MaterialOutputDTO();
        materialOutputDTO1.setId(1L);
        MaterialOutputDTO materialOutputDTO2 = new MaterialOutputDTO();
        assertThat(materialOutputDTO1).isNotEqualTo(materialOutputDTO2);
        materialOutputDTO2.setId(materialOutputDTO1.getId());
        assertThat(materialOutputDTO1).isEqualTo(materialOutputDTO2);
        materialOutputDTO2.setId(2L);
        assertThat(materialOutputDTO1).isNotEqualTo(materialOutputDTO2);
        materialOutputDTO1.setId(null);
        assertThat(materialOutputDTO1).isNotEqualTo(materialOutputDTO2);
    }
}
