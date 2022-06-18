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
 * A MaterialOutput.
 */
@Entity
@Table(name = "material_output")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MaterialOutput implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_matrial")
    private MaterialType typeOfMatrial;

    @Column(name = "sub_total")
    private Long subTotal;

    @OneToMany(mappedBy = "materialOutput")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "materialOutput" }, allowSetters = true)
    private Set<Destination> destinations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public MaterialOutput id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MaterialType getTypeOfMatrial() {
        return this.typeOfMatrial;
    }

    public MaterialOutput typeOfMatrial(MaterialType typeOfMatrial) {
        this.setTypeOfMatrial(typeOfMatrial);
        return this;
    }

    public void setTypeOfMatrial(MaterialType typeOfMatrial) {
        this.typeOfMatrial = typeOfMatrial;
    }

    public Long getSubTotal() {
        return this.subTotal;
    }

    public MaterialOutput subTotal(Long subTotal) {
        this.setSubTotal(subTotal);
        return this;
    }

    public void setSubTotal(Long subTotal) {
        this.subTotal = subTotal;
    }

    public Set<Destination> getDestinations() {
        return this.destinations;
    }

    public void setDestinations(Set<Destination> destinations) {
        if (this.destinations != null) {
            this.destinations.forEach(i -> i.setMaterialOutput(null));
        }
        if (destinations != null) {
            destinations.forEach(i -> i.setMaterialOutput(this));
        }
        this.destinations = destinations;
    }

    public MaterialOutput destinations(Set<Destination> destinations) {
        this.setDestinations(destinations);
        return this;
    }

    public MaterialOutput addDestination(Destination destination) {
        this.destinations.add(destination);
        destination.setMaterialOutput(this);
        return this;
    }

    public MaterialOutput removeDestination(Destination destination) {
        this.destinations.remove(destination);
        destination.setMaterialOutput(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MaterialOutput)) {
            return false;
        }
        return id != null && id.equals(((MaterialOutput) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MaterialOutput{" +
            "id=" + getId() +
            ", typeOfMatrial='" + getTypeOfMatrial() + "'" +
            ", subTotal=" + getSubTotal() +
            "}";
    }
}
