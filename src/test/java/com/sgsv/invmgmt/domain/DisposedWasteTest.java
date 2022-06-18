package com.sgsv.invmgmt.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sgsv.invmgmt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DisposedWasteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DisposedWaste.class);
        DisposedWaste disposedWaste1 = new DisposedWaste();
        disposedWaste1.setId(1L);
        DisposedWaste disposedWaste2 = new DisposedWaste();
        disposedWaste2.setId(disposedWaste1.getId());
        assertThat(disposedWaste1).isEqualTo(disposedWaste2);
        disposedWaste2.setId(2L);
        assertThat(disposedWaste1).isNotEqualTo(disposedWaste2);
        disposedWaste1.setId(null);
        assertThat(disposedWaste1).isNotEqualTo(disposedWaste2);
    }
}
