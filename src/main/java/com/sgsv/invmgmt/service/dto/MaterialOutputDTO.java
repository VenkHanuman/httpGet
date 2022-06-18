package com.sgsv.invmgmt.service.dto;

import com.sgsv.invmgmt.domain.enumeration.MaterialType;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sgsv.invmgmt.domain.MaterialOutput} entity.
 */
public class MaterialOutputDTO implements Serializable {

    private Long id;

    private MaterialType typeOfMatrial;

    private Long subTotal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MaterialType getTypeOfMatrial() {
        return typeOfMatrial;
    }

    public void setTypeOfMatrial(MaterialType typeOfMatrial) {
        this.typeOfMatrial = typeOfMatrial;
    }

    public Long getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(Long subTotal) {
        this.subTotal = subTotal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MaterialOutputDTO)) {
            return false;
        }

        MaterialOutputDTO materialOutputDTO = (MaterialOutputDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, materialOutputDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MaterialOutputDTO{" +
            "id=" + getId() +
            ", typeOfMatrial='" + getTypeOfMatrial() + "'" +
            ", subTotal=" + getSubTotal() +
            "}";
    }
}
