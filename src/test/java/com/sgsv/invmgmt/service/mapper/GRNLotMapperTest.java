package com.sgsv.invmgmt.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GRNLotMapperTest {

    private GRNLotMapper gRNLotMapper;

    @BeforeEach
    public void setUp() {
        gRNLotMapper = new GRNLotMapperImpl();
    }
}
