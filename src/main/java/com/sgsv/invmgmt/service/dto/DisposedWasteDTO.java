package com.sgsv.invmgmt.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sgsv.invmgmt.domain.DisposedWaste} entity.
 */
public class DisposedWasteDTO implements Serializable {

    private Long id;

    private Long subTotal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
        if (!(o instanceof DisposedWasteDTO)) {
            return false;
        }

        DisposedWasteDTO disposedWasteDTO = (DisposedWasteDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, disposedWasteDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DisposedWasteDTO{" +
            "id=" + getId() +
            ", subTotal=" + getSubTotal() +
            "}";
    }
}
