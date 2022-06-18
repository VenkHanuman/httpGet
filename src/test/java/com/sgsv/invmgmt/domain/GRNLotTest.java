package com.sgsv.invmgmt.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GRNLotTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GRNLot.class);
        GRNLot gRNLot1 = new GRNLot();
        gRNLot1.setId(1L);
        GRNLot gRNLot2 = new GRNLot();
        gRNLot2.setId(gRNLot1.getId());
        assertThat(gRNLot1).isEqualTo(gRNLot2);
        gRNLot2.setId(2L);
        assertThat(gRNLot1).isNotEqualTo(gRNLot2);
        gRNLot1.setId(null);
        assertThat(gRNLot1).isNotEqualTo(gRNLot2);
    }
}
