package com.sgsv.invmgmt.service.mapper;

import com.sgsv.invmgmt.domain.GRNLot;
import com.sgsv.invmgmt.service.dto.GRNLotDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link GRNLot} and its DTO {@link GRNLotDTO}.
 */
@Mapper(componentModel = "spring")
public interface GRNLotMapper extends EntityMapper<GRNLotDTO, GRNLot> {}
