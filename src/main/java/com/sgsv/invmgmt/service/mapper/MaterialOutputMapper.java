package com.sgsv.invmgmt.service.mapper;

import com.sgsv.invmgmt.domain.MaterialOutput;
import com.sgsv.invmgmt.service.dto.MaterialOutputDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link MaterialOutput} and its DTO {@link MaterialOutputDTO}.
 */
@Mapper(componentModel = "spring")
public interface MaterialOutputMapper extends EntityMapper<MaterialOutputDTO, MaterialOutput> {}
