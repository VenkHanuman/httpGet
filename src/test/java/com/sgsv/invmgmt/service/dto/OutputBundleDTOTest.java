package com.sgsv.invmgmt.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OutputBundleDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OutputBundleDTO.class);
        OutputBundleDTO outputBundleDTO1 = new OutputBundleDTO();
        outputBundleDTO1.setId(1L);
        OutputBundleDTO outputBundleDTO2 = new OutputBundleDTO();
        assertThat(outputBundleDTO1).isNotEqualTo(outputBundleDTO2);
        outputBundleDTO2.setId(outputBundleDTO1.getId());
        assertThat(outputBundleDTO1).isEqualTo(outputBundleDTO2);
        outputBundleDTO2.setId(2L);
        assertThat(outputBundleDTO1).isNotEqualTo(outputBundleDTO2);
        outputBundleDTO1.setId(null);
        assertThat(outputBundleDTO1).isNotEqualTo(outputBundleDTO2);
    }
}
