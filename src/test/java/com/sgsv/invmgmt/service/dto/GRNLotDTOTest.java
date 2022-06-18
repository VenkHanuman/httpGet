package com.sgsv.invmgmt.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GRNLotDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GRNLotDTO.class);
        GRNLotDTO gRNLotDTO1 = new GRNLotDTO();
        gRNLotDTO1.setId(1L);
        GRNLotDTO gRNLotDTO2 = new GRNLotDTO();
        assertThat(gRNLotDTO1).isNotEqualTo(gRNLotDTO2);
        gRNLotDTO2.setId(gRNLotDTO1.getId());
        assertThat(gRNLotDTO1).isEqualTo(gRNLotDTO2);
        gRNLotDTO2.setId(2L);
        assertThat(gRNLotDTO1).isNotEqualTo(gRNLotDTO2);
        gRNLotDTO1.setId(null);
        assertThat(gRNLotDTO1).isNotEqualTo(gRNLotDTO2);
    }
}
