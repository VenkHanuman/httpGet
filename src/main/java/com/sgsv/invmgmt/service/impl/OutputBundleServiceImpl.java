package com.sgsv.invmgmt.service.impl;

import com.sgsv.invmgmt.domain.OutputBundle;
import com.sgsv.invmgmt.repository.OutputBundleRepository;
import com.sgsv.invmgmt.service.OutputBundleService;
import com.sgsv.invmgmt.service.dto.OutputBundleDTO;
import com.sgsv.invmgmt.service.mapper.OutputBundleMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link OutputBundle}.
 */
@Service
@Transactional
public class OutputBundleServiceImpl implements OutputBundleService {

    private final Logger log = LoggerFactory.getLogger(OutputBundleServiceImpl.class);

    private final OutputBundleRepository outputBundleRepository;

    private final OutputBundleMapper outputBundleMapper;

    public OutputBundleServiceImpl(OutputBundleRepository outputBundleRepository, OutputBundleMapper outputBundleMapper) {
        this.outputBundleRepository = outputBundleRepository;
        this.outputBundleMapper = outputBundleMapper;
    }

    @Override
    public OutputBundleDTO save(OutputBundleDTO outputBundleDTO) {
        log.debug("Request to save OutputBundle : {}", outputBundleDTO);
        OutputBundle outputBundle = outputBundleMapper.toEntity(outputBundleDTO);
        outputBundle = outputBundleRepository.save(outputBundle);
        return outputBundleMapper.toDto(outputBundle);
    }

    @Override
    public OutputBundleDTO update(OutputBundleDTO outputBundleDTO) {
        log.debug("Request to save OutputBundle : {}", outputBundleDTO);
        OutputBundle outputBundle = outputBundleMapper.toEntity(outputBundleDTO);
        outputBundle = outputBundleRepository.save(outputBundle);
        return outputBundleMapper.toDto(outputBundle);
    }

    @Override
    public Optional<OutputBundleDTO> partialUpdate(OutputBundleDTO outputBundleDTO) {
        log.debug("Request to partially update OutputBundle : {}", outputBundleDTO);

        return outputBundleRepository
            .findById(outputBundleDTO.getId())
            .map(existingOutputBundle -> {
                outputBundleMapper.partialUpdate(existingOutputBundle, outputBundleDTO);

                return existingOutputBundle;
            })
            .map(outputBundleRepository::save)
            .map(outputBundleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OutputBundleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all OutputBundles");
        return outputBundleRepository.findAll(pageable).map(outputBundleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OutputBundleDTO> findOne(Long id) {
        log.debug("Request to get OutputBundle : {}", id);
        return outputBundleRepository.findById(id).map(outputBundleMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete OutputBundle : {}", id);
        outputBundleRepository.deleteById(id);
    }
}
