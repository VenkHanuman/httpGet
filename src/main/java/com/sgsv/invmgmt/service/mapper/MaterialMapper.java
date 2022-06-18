package com.sgsv.invmgmt.service.mapper;

import com.sgsv.invmgmt.domain.Material;
import com.sgsv.invmgmt.service.dto.MaterialDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Material} and its DTO {@link MaterialDTO}.
 */
@Mapper(componentModel = "spring")
public interface MaterialMapper extends EntityMapper<MaterialDTO, Material> {}
