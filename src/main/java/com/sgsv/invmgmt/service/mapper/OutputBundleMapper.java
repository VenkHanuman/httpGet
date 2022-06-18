package com.sgsv.invmgmt.service.mapper;

import com.sgsv.invmgmt.domain.OutputBundle;
import com.sgsv.invmgmt.service.dto.OutputBundleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OutputBundle} and its DTO {@link OutputBundleDTO}.
 */
@Mapper(componentModel = "spring")
public interface OutputBundleMapper extends EntityMapper<OutputBundleDTO, OutputBundle> {}
