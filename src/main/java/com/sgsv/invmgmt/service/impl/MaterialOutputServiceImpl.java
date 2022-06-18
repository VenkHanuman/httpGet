package com.sgsv.invmgmt.service.impl;

import com.sgsv.invmgmt.domain.MaterialOutput;
import com.sgsv.invmgmt.repository.MaterialOutputRepository;
import com.sgsv.invmgmt.service.MaterialOutputService;
import com.sgsv.invmgmt.service.dto.MaterialOutputDTO;
import com.sgsv.invmgmt.service.mapper.MaterialOutputMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link MaterialOutput}.
 */
@Service
@Transactional
public class MaterialOutputServiceImpl implements MaterialOutputService {

    private final Logger log = LoggerFactory.getLogger(MaterialOutputServiceImpl.class);

    private final MaterialOutputRepository materialOutputRepository;

    private final MaterialOutputMapper materialOutputMapper;

    public MaterialOutputServiceImpl(MaterialOutputRepository materialOutputRepository, MaterialOutputMapper materialOutputMapper) {
        this.materialOutputRepository = materialOutputRepository;
        this.materialOutputMapper = materialOutputMapper;
    }

    @Override
    public MaterialOutputDTO save(MaterialOutputDTO materialOutputDTO) {
        log.debug("Request to save MaterialOutput : {}", materialOutputDTO);
        MaterialOutput materialOutput = materialOutputMapper.toEntity(materialOutputDTO);
        materialOutput = materialOutputRepository.save(materialOutput);
        return materialOutputMapper.toDto(materialOutput);
    }

    @Override
    public MaterialOutputDTO update(MaterialOutputDTO materialOutputDTO) {
        log.debug("Request to save MaterialOutput : {}", materialOutputDTO);
        MaterialOutput materialOutput = materialOutputMapper.toEntity(materialOutputDTO);
        materialOutput = materialOutputRepository.save(materialOutput);
        return materialOutputMapper.toDto(materialOutput);
    }

    @Override
    public Optional<MaterialOutputDTO> partialUpdate(MaterialOutputDTO materialOutputDTO) {
        log.debug("Request to partially update MaterialOutput : {}", materialOutputDTO);

        return materialOutputRepository
            .findById(materialOutputDTO.getId())
            .map(existingMaterialOutput -> {
                materialOutputMapper.partialUpdate(existingMaterialOutput, materialOutputDTO);

                return existingMaterialOutput;
            })
            .map(materialOutputRepository::save)
            .map(materialOutputMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaterialOutputDTO> findAll() {
        log.debug("Request to get all MaterialOutputs");
        return materialOutputRepository
            .findAll()
            .stream()
            .map(materialOutputMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MaterialOutputDTO> findOne(Long id) {
        log.debug("Request to get MaterialOutput : {}", id);
        return materialOutputRepository.findById(id).map(materialOutputMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete MaterialOutput : {}", id);
        materialOutputRepository.deleteById(id);
    }
}
