package com.sgsv.invmgmt.service.mapper;

import com.sgsv.invmgmt.domain.Destination;
import com.sgsv.invmgmt.domain.MaterialOutput;
import com.sgsv.invmgmt.service.dto.DestinationDTO;
import com.sgsv.invmgmt.service.dto.MaterialOutputDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Destination} and its DTO {@link DestinationDTO}.
 */
@Mapper(componentModel = "spring")
public interface DestinationMapper extends EntityMapper<DestinationDTO, Destination> {
    @Mapping(target = "materialOutput", source = "materialOutput", qualifiedByName = "materialOutputId")
    DestinationDTO toDto(Destination s);

    @Named("materialOutputId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    MaterialOutputDTO toDtoMaterialOutputId(MaterialOutput materialOutput);
}
