package com.sgsv.invmgmt.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DestinationMapperTest {

    private DestinationMapper destinationMapper;

    @BeforeEach
    public void setUp() {
        destinationMapper = new DestinationMapperImpl();
    }
}
