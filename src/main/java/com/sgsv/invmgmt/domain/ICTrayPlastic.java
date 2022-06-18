package com.sgsv.invmgmt.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ICTrayPlastic.
 */
@Entity
@Table(name = "ic_tray_plastic")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ICTrayPlastic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "brand_name")
    private String brandName;

    @ManyToOne
    @JsonIgnoreProperties(value = { "icTrayPlastics" }, allowSetters = true)
    private Material material;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ICTrayPlastic id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrandName() {
        return this.brandName;
    }

    public ICTrayPlastic brandName(String brandName) {
        this.setBrandName(brandName);
        return this;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public Material getMaterial() {
        return this.material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public ICTrayPlastic material(Material material) {
        this.setMaterial(material);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ICTrayPlastic)) {
            return false;
        }
        return id != null && id.equals(((ICTrayPlastic) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ICTrayPlastic{" +
            "id=" + getId() +
            ", brandName='" + getBrandName() + "'" +
            "}";
    }
}
