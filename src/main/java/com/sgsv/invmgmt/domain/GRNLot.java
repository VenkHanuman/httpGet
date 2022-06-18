package com.sgsv.invmgmt.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * GRN Lot entity.\n@author The SgSv team.
 */
@Entity
@Table(name = "grn_lot")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GRNLot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "grn_code")
    private String grnCode;

    @Column(name = "collection_date")
    private Instant collectionDate;

    @Column(name = "vehicle_number")
    private String vehicleNumber;

    @Column(name = "src_of_materials")
    private String srcOfMaterials;

    @Column(name = "total_weight")
    private Long totalWeight;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public GRNLot id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGrnCode() {
        return this.grnCode;
    }

    public GRNLot grnCode(String grnCode) {
        this.setGrnCode(grnCode);
        return this;
    }

    public void setGrnCode(String grnCode) {
        this.grnCode = grnCode;
    }

    public Instant getCollectionDate() {
        return this.collectionDate;
    }

    public GRNLot collectionDate(Instant collectionDate) {
        this.setCollectionDate(collectionDate);
        return this;
    }

    public void setCollectionDate(Instant collectionDate) {
        this.collectionDate = collectionDate;
    }

    public String getVehicleNumber() {
        return this.vehicleNumber;
    }

    public GRNLot vehicleNumber(String vehicleNumber) {
        this.setVehicleNumber(vehicleNumber);
        return this;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getSrcOfMaterials() {
        return this.srcOfMaterials;
    }

    public GRNLot srcOfMaterials(String srcOfMaterials) {
        this.setSrcOfMaterials(srcOfMaterials);
        return this;
    }

    public void setSrcOfMaterials(String srcOfMaterials) {
        this.srcOfMaterials = srcOfMaterials;
    }

    public Long getTotalWeight() {
        return this.totalWeight;
    }

    public GRNLot totalWeight(Long totalWeight) {
        this.setTotalWeight(totalWeight);
        return this;
    }

    public void setTotalWeight(Long totalWeight) {
        this.totalWeight = totalWeight;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GRNLot)) {
            return false;
        }
        return id != null && id.equals(((GRNLot) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GRNLot{" +
            "id=" + getId() +
            ", grnCode='" + getGrnCode() + "'" +
            ", collectionDate='" + getCollectionDate() + "'" +
            ", vehicleNumber='" + getVehicleNumber() + "'" +
            ", srcOfMaterials='" + getSrcOfMaterials() + "'" +
            ", totalWeight=" + getTotalWeight() +
            "}";
    }
}
