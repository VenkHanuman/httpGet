package com.sgsv.invmgmt.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.sgsv.invmgmt.domain.GRNLot} entity.
 */
@Schema(description = "GRN Lot entity.\n@author The SgSv team.")
public class GRNLotDTO implements Serializable {

    private Long id;

    private String grnCode;

    private Instant collectionDate;

    private String vehicleNumber;

    private String srcOfMaterials;

    private Long totalWeight;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGrnCode() {
        return grnCode;
    }

    public void setGrnCode(String grnCode) {
        this.grnCode = grnCode;
    }

    public Instant getCollectionDate() {
        return collectionDate;
    }

    public void setCollectionDate(Instant collectionDate) {
        this.collectionDate = collectionDate;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getSrcOfMaterials() {
        return srcOfMaterials;
    }

    public void setSrcOfMaterials(String srcOfMaterials) {
        this.srcOfMaterials = srcOfMaterials;
    }

    public Long getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(Long totalWeight) {
        this.totalWeight = totalWeight;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GRNLotDTO)) {
            return false;
        }

        GRNLotDTO gRNLotDTO = (GRNLotDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, gRNLotDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GRNLotDTO{" +
            "id=" + getId() +
            ", grnCode='" + getGrnCode() + "'" +
            ", collectionDate='" + getCollectionDate() + "'" +
            ", vehicleNumber='" + getVehicleNumber() + "'" +
            ", srcOfMaterials='" + getSrcOfMaterials() + "'" +
            ", totalWeight=" + getTotalWeight() +
            "}";
    }
}
