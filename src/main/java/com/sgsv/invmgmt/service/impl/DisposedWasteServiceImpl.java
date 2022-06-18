package com.sgsv.invmgmt.service.impl;

import com.sgsv.invmgmt.domain.DisposedWaste;
import com.sgsv.invmgmt.repository.DisposedWasteRepository;
import com.sgsv.invmgmt.service.DisposedWasteService;
import com.sgsv.invmgmt.service.dto.DisposedWasteDTO;
import com.sgsv.invmgmt.service.mapper.DisposedWasteMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link DisposedWaste}.
 */
@Service
@Transactional
public class DisposedWasteServiceImpl implements DisposedWasteService {

    private final Logger log = LoggerFactory.getLogger(DisposedWasteServiceImpl.class);

    private final DisposedWasteRepository disposedWasteRepository;

    private final DisposedWasteMapper disposedWasteMapper;

    public DisposedWasteServiceImpl(DisposedWasteRepository disposedWasteRepository, DisposedWasteMapper disposedWasteMapper) {
        this.disposedWasteRepository = disposedWasteRepository;
        this.disposedWasteMapper = disposedWasteMapper;
    }

    @Override
    public DisposedWasteDTO save(DisposedWasteDTO disposedWasteDTO) {
        log.debug("Request to save DisposedWaste : {}", disposedWasteDTO);
        DisposedWaste disposedWaste = disposedWasteMapper.toEntity(disposedWasteDTO);
        disposedWaste = disposedWasteRepository.save(disposedWaste);
        return disposedWasteMapper.toDto(disposedWaste);
    }

    @Override
    public DisposedWasteDTO update(DisposedWasteDTO disposedWasteDTO) {
        log.debug("Request to save DisposedWaste : {}", disposedWasteDTO);
        DisposedWaste disposedWaste = disposedWasteMapper.toEntity(disposedWasteDTO);
        disposedWaste = disposedWasteRepository.save(disposedWaste);
        return disposedWasteMapper.toDto(disposedWaste);
    }

    @Override
    public Optional<DisposedWasteDTO> partialUpdate(DisposedWasteDTO disposedWasteDTO) {
        log.debug("Request to partially update DisposedWaste : {}", disposedWasteDTO);

        return disposedWasteRepository
            .findById(disposedWasteDTO.getId())
            .map(existingDisposedWaste -> {
                disposedWasteMapper.partialUpdate(existingDisposedWaste, disposedWasteDTO);

                return existingDisposedWaste;
            })
            .map(disposedWasteRepository::save)
            .map(disposedWasteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DisposedWasteDTO> findAll() {
        log.debug("Request to get all DisposedWastes");
        return disposedWasteRepository.findAll().stream().map(disposedWasteMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DisposedWasteDTO> findOne(Long id) {
        log.debug("Request to get DisposedWaste : {}", id);
        return disposedWasteRepository.findById(id).map(disposedWasteMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete DisposedWaste : {}", id);
        disposedWasteRepository.deleteById(id);
    }
}
