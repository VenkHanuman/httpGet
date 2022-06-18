package com.sgsv.invmgmt.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MaterialOutputMapperTest {

    private MaterialOutputMapper materialOutputMapper;

    @BeforeEach
    public void setUp() {
        materialOutputMapper = new MaterialOutputMapperImpl();
    }
}
