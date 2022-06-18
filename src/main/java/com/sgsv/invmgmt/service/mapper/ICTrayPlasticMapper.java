package com.sgsv.invmgmt.service.mapper;

import com.sgsv.invmgmt.domain.ICTrayPlastic;
import com.sgsv.invmgmt.domain.Material;
import com.sgsv.invmgmt.service.dto.ICTrayPlasticDTO;
import com.sgsv.invmgmt.service.dto.MaterialDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ICTrayPlastic} and its DTO {@link ICTrayPlasticDTO}.
 */
@Mapper(componentModel = "spring")
public interface ICTrayPlasticMapper extends EntityMapper<ICTrayPlasticDTO, ICTrayPlastic> {
    @Mapping(target = "material", source = "material", qualifiedByName = "materialId")
    ICTrayPlasticDTO toDto(ICTrayPlastic s);

    @Named("materialId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    MaterialDTO toDtoMaterialId(Material material);
}
