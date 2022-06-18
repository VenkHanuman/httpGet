package com.sgsv.invmgmt.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DestinationDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DestinationDTO.class);
        DestinationDTO destinationDTO1 = new DestinationDTO();
        destinationDTO1.setId(1L);
        DestinationDTO destinationDTO2 = new DestinationDTO();
        assertThat(destinationDTO1).isNotEqualTo(destinationDTO2);
        destinationDTO2.setId(destinationDTO1.getId());
        assertThat(destinationDTO1).isEqualTo(destinationDTO2);
        destinationDTO2.setId(2L);
        assertThat(destinationDTO1).isNotEqualTo(destinationDTO2);
        destinationDTO1.setId(null);
        assertThat(destinationDTO1).isNotEqualTo(destinationDTO2);
    }
}
