package com.sgsv.invmgmt.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sgsv.invmgmt.domain.ICTrayPlastic} entity.
 */
public class ICTrayPlasticDTO implements Serializable {

    private Long id;

    private String brandName;

    private MaterialDTO material;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public MaterialDTO getMaterial() {
        return material;
    }

    public void setMaterial(MaterialDTO material) {
        this.material = material;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ICTrayPlasticDTO)) {
            return false;
        }

        ICTrayPlasticDTO iCTrayPlasticDTO = (ICTrayPlasticDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, iCTrayPlasticDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ICTrayPlasticDTO{" +
            "id=" + getId() +
            ", brandName='" + getBrandName() + "'" +
            ", material=" + getMaterial() +
            "}";
    }
}
