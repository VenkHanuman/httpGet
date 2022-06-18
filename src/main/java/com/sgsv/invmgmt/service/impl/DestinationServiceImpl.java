package com.sgsv.invmgmt.service.impl;

import com.sgsv.invmgmt.domain.Destination;
import com.sgsv.invmgmt.repository.DestinationRepository;
import com.sgsv.invmgmt.service.DestinationService;
import com.sgsv.invmgmt.service.dto.DestinationDTO;
import com.sgsv.invmgmt.service.mapper.DestinationMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Destination}.
 */
@Service
@Transactional
public class DestinationServiceImpl implements DestinationService {

    private final Logger log = LoggerFactory.getLogger(DestinationServiceImpl.class);

    private final DestinationRepository destinationRepository;

    private final DestinationMapper destinationMapper;

    public DestinationServiceImpl(DestinationRepository destinationRepository, DestinationMapper destinationMapper) {
        this.destinationRepository = destinationRepository;
        this.destinationMapper = destinationMapper;
    }

    @Override
    public DestinationDTO save(DestinationDTO destinationDTO) {
        log.debug("Request to save Destination : {}", destinationDTO);
        Destination destination = destinationMapper.toEntity(destinationDTO);
        destination = destinationRepository.save(destination);
        return destinationMapper.toDto(destination);
    }

    @Override
    public DestinationDTO update(DestinationDTO destinationDTO) {
        log.debug("Request to save Destination : {}", destinationDTO);
        Destination destination = destinationMapper.toEntity(destinationDTO);
        destination = destinationRepository.save(destination);
        return destinationMapper.toDto(destination);
    }

    @Override
    public Optional<DestinationDTO> partialUpdate(DestinationDTO destinationDTO) {
        log.debug("Request to partially update Destination : {}", destinationDTO);

        return destinationRepository
            .findById(destinationDTO.getId())
            .map(existingDestination -> {
                destinationMapper.partialUpdate(existingDestination, destinationDTO);

                return existingDestination;
            })
            .map(destinationRepository::save)
            .map(destinationMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DestinationDTO> findAll() {
        log.debug("Request to get all Destinations");
        return destinationRepository.findAll().stream().map(destinationMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DestinationDTO> findOne(Long id) {
        log.debug("Request to get Destination : {}", id);
        return destinationRepository.findById(id).map(destinationMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Destination : {}", id);
        destinationRepository.deleteById(id);
    }
}
