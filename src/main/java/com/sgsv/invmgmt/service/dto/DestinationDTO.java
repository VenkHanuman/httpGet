package com.sgsv.invmgmt.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sgsv.invmgmt.domain.Destination} entity.
 */
public class DestinationDTO implements Serializable {

    private Long id;

    private String name;

    private MaterialOutputDTO materialOutput;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MaterialOutputDTO getMaterialOutput() {
        return materialOutput;
    }

    public void setMaterialOutput(MaterialOutputDTO materialOutput) {
        this.materialOutput = materialOutput;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DestinationDTO)) {
            return false;
        }

        DestinationDTO destinationDTO = (DestinationDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, destinationDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DestinationDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", materialOutput=" + getMaterialOutput() +
            "}";
    }
}
