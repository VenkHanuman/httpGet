package com.sgsv.invmgmt.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DisposedWasteDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DisposedWasteDTO.class);
        DisposedWasteDTO disposedWasteDTO1 = new DisposedWasteDTO();
        disposedWasteDTO1.setId(1L);
        DisposedWasteDTO disposedWasteDTO2 = new DisposedWasteDTO();
        assertThat(disposedWasteDTO1).isNotEqualTo(disposedWasteDTO2);
        disposedWasteDTO2.setId(disposedWasteDTO1.getId());
        assertThat(disposedWasteDTO1).isEqualTo(disposedWasteDTO2);
        disposedWasteDTO2.setId(2L);
        assertThat(disposedWasteDTO1).isNotEqualTo(disposedWasteDTO2);
        disposedWasteDTO1.setId(null);
        assertThat(disposedWasteDTO1).isNotEqualTo(disposedWasteDTO2);
    }
}
