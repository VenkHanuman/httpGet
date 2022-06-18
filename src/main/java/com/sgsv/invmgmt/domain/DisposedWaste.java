package com.sgsv.invmgmt.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DisposedWaste.
 */
@Entity
@Table(name = "disposed_waste")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DisposedWaste implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "sub_total")
    private Long subTotal;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DisposedWaste id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSubTotal() {
        return this.subTotal;
    }

    public DisposedWaste subTotal(Long subTotal) {
        this.setSubTotal(subTotal);
        return this;
    }

    public void setSubTotal(Long subTotal) {
        this.subTotal = subTotal;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DisposedWaste)) {
            return false;
        }
        return id != null && id.equals(((DisposedWaste) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DisposedWaste{" +
            "id=" + getId() +
            ", subTotal=" + getSubTotal() +
            "}";
    }
}
