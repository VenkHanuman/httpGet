package com.sgsv.invmgmt.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sgsv.invmgmt.domain.enumeration.MaterialType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The Material entity.
 */
@Entity
@Table(name = "material")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Material implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /**
     * The typeOfMaterial attribute.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_material")
    private MaterialType typeOfMaterial;

    @Column(name = "sub_total_weight")
    private Long subTotalWeight;

    @OneToMany(mappedBy = "material")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "material" }, allowSetters = true)
    private Set<ICTrayPlastic> icTrayPlastics = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Material id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MaterialType getTypeOfMaterial() {
        return this.typeOfMaterial;
    }

    public Material typeOfMaterial(MaterialType typeOfMaterial) {
        this.setTypeOfMaterial(typeOfMaterial);
        return this;
    }

    public void setTypeOfMaterial(MaterialType typeOfMaterial) {
        this.typeOfMaterial = typeOfMaterial;
    }

    public Long getSubTotalWeight() {
        return this.subTotalWeight;
    }

    public Material subTotalWeight(Long subTotalWeight) {
        this.setSubTotalWeight(subTotalWeight);
        return this;
    }

    public void setSubTotalWeight(Long subTotalWeight) {
        this.subTotalWeight = subTotalWeight;
    }

    public Set<ICTrayPlastic> getIcTrayPlastics() {
        return this.icTrayPlastics;
    }

    public void setIcTrayPlastics(Set<ICTrayPlastic> iCTrayPlastics) {
        if (this.icTrayPlastics != null) {
            this.icTrayPlastics.forEach(i -> i.setMaterial(null));
        }
        if (iCTrayPlastics != null) {
            iCTrayPlastics.forEach(i -> i.setMaterial(this));
        }
        this.icTrayPlastics = iCTrayPlastics;
    }

    public Material icTrayPlastics(Set<ICTrayPlastic> iCTrayPlastics) {
        this.setIcTrayPlastics(iCTrayPlastics);
        return this;
    }

    public Material addIcTrayPlastic(ICTrayPlastic iCTrayPlastic) {
        this.icTrayPlastics.add(iCTrayPlastic);
        iCTrayPlastic.setMaterial(this);
        return this;
    }

    public Material removeIcTrayPlastic(ICTrayPlastic iCTrayPlastic) {
        this.icTrayPlastics.remove(iCTrayPlastic);
        iCTrayPlastic.setMaterial(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Material)) {
            return false;
        }
        return id != null && id.equals(((Material) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Material{" +
            "id=" + getId() +
            ", typeOfMaterial='" + getTypeOfMaterial() + "'" +
            ", subTotalWeight=" + getSubTotalWeight() +
            "}";
    }
}
