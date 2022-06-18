package com.sgsv.invmgmt.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DisposedWasteMapperTest {

    private DisposedWasteMapper disposedWasteMapper;

    @BeforeEach
    public void setUp() {
        disposedWasteMapper = new DisposedWasteMapperImpl();
    }
}
