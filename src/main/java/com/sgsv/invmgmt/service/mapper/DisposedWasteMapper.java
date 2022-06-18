package com.sgsv.invmgmt.service.mapper;

import com.sgsv.invmgmt.domain.DisposedWaste;
import com.sgsv.invmgmt.service.dto.DisposedWasteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DisposedWaste} and its DTO {@link DisposedWasteDTO}.
 */
@Mapper(componentModel = "spring")
public interface DisposedWasteMapper extends EntityMapper<DisposedWasteDTO, DisposedWaste> {}
