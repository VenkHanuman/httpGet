package com.sgsv.invmgmt.service.dto;

import com.sgsv.invmgmt.domain.enumeration.MaterialType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sgsv.invmgmt.domain.Material} entity.
 */
@Schema(description = "The Material entity.")
public class MaterialDTO implements Serializable {

    private Long id;

    /**
     * The typeOfMaterial attribute.
     */
    @Schema(description = "The typeOfMaterial attribute.")
    private MaterialType typeOfMaterial;

    private Long subTotalWeight;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MaterialType getTypeOfMaterial() {
        return typeOfMaterial;
    }

    public void setTypeOfMaterial(MaterialType typeOfMaterial) {
        this.typeOfMaterial = typeOfMaterial;
    }

    public Long getSubTotalWeight() {
        return subTotalWeight;
    }

    public void setSubTotalWeight(Long subTotalWeight) {
        this.subTotalWeight = subTotalWeight;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MaterialDTO)) {
            return false;
        }

        MaterialDTO materialDTO = (MaterialDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, materialDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MaterialDTO{" +
            "id=" + getId() +
            ", typeOfMaterial='" + getTypeOfMaterial() + "'" +
            ", subTotalWeight=" + getSubTotalWeight() +
            "}";
    }
}
