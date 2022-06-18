package com.sgsv.invmgmt.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sgsv.invmgmt.domain.OutputBundle} entity.
 */
public class OutputBundleDTO implements Serializable {

    private Long id;

    private Long total;

    private Long totalOfDisposableWaste;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Long getTotalOfDisposableWaste() {
        return totalOfDisposableWaste;
    }

    public void setTotalOfDisposableWaste(Long totalOfDisposableWaste) {
        this.totalOfDisposableWaste = totalOfDisposableWaste;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OutputBundleDTO)) {
            return false;
        }

        OutputBundleDTO outputBundleDTO = (OutputBundleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, outputBundleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OutputBundleDTO{" +
            "id=" + getId() +
            ", total=" + getTotal() +
            ", totalOfDisposableWaste=" + getTotalOfDisposableWaste() +
            "}";
    }
}
