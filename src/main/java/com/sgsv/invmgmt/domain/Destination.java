package com.sgsv.invmgmt.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Destination.
 */
@Entity
@Table(name = "destination")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Destination implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties(value = { "destinations" }, allowSetters = true)
    private MaterialOutput materialOutput;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Destination id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Destination name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MaterialOutput getMaterialOutput() {
        return this.materialOutput;
    }

    public void setMaterialOutput(MaterialOutput materialOutput) {
        this.materialOutput = materialOutput;
    }

    public Destination materialOutput(MaterialOutput materialOutput) {
        this.setMaterialOutput(materialOutput);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Destination)) {
            return false;
        }
        return id != null && id.equals(((Destination) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Destination{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
