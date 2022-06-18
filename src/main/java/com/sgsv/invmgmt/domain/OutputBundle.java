package com.sgsv.invmgmt.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A OutputBundle.
 */
@Entity
@Table(name = "output_bundle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class OutputBundle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "total")
    private Long total;

    @Column(name = "total_of_disposable_waste")
    private Long totalOfDisposableWaste;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public OutputBundle id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTotal() {
        return this.total;
    }

    public OutputBundle total(Long total) {
        this.setTotal(total);
        return this;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Long getTotalOfDisposableWaste() {
        return this.totalOfDisposableWaste;
    }

    public OutputBundle totalOfDisposableWaste(Long totalOfDisposableWaste) {
        this.setTotalOfDisposableWaste(totalOfDisposableWaste);
        return this;
    }

    public void setTotalOfDisposableWaste(Long totalOfDisposableWaste) {
        this.totalOfDisposableWaste = totalOfDisposableWaste;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OutputBundle)) {
            return false;
        }
        return id != null && id.equals(((OutputBundle) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OutputBundle{" +
            "id=" + getId() +
            ", total=" + getTotal() +
            ", totalOfDisposableWaste=" + getTotalOfDisposableWaste() +
            "}";
    }
}
