package com.sgsv.invmgmt.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MaterialOutputTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaterialOutput.class);
        MaterialOutput materialOutput1 = new MaterialOutput();
        materialOutput1.setId(1L);
        MaterialOutput materialOutput2 = new MaterialOutput();
        materialOutput2.setId(materialOutput1.getId());
        assertThat(materialOutput1).isEqualTo(materialOutput2);
        materialOutput2.setId(2L);
        assertThat(materialOutput1).isNotEqualTo(materialOutput2);
        materialOutput1.setId(null);
        assertThat(materialOutput1).isNotEqualTo(materialOutput2);
    }
}
