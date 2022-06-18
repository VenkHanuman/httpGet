package com.sgsv.invmgmt.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class OutputBundleMapperTest {

    private OutputBundleMapper outputBundleMapper;

    @BeforeEach
    public void setUp() {
        outputBundleMapper = new OutputBundleMapperImpl();
    }
}
