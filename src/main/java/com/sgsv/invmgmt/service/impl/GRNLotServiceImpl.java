package com.sgsv.invmgmt.service.impl;

import com.sgsv.invmgmt.domain.GRNLot;
import com.sgsv.invmgmt.repository.GRNLotRepository;
import com.sgsv.invmgmt.service.GRNLotService;
import com.sgsv.invmgmt.service.dto.GRNLotDTO;
import com.sgsv.invmgmt.service.mapper.GRNLotMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link GRNLot}.
 */
@Service
@Transactional
public class GRNLotServiceImpl implements GRNLotService {

    private final Logger log = LoggerFactory.getLogger(GRNLotServiceImpl.class);

    private final GRNLotRepository gRNLotRepository;

    private final GRNLotMapper gRNLotMapper;

    public GRNLotServiceImpl(GRNLotRepository gRNLotRepository, GRNLotMapper gRNLotMapper) {
        this.gRNLotRepository = gRNLotRepository;
        this.gRNLotMapper = gRNLotMapper;
    }

    @Override
    public GRNLotDTO save(GRNLotDTO gRNLotDTO) {
        log.debug("Request to save GRNLot : {}", gRNLotDTO);
        GRNLot gRNLot = gRNLotMapper.toEntity(gRNLotDTO);
        gRNLot = gRNLotRepository.save(gRNLot);
        return gRNLotMapper.toDto(gRNLot);
    }

    @Override
    public GRNLotDTO update(GRNLotDTO gRNLotDTO) {
        log.debug("Request to save GRNLot : {}", gRNLotDTO);
        GRNLot gRNLot = gRNLotMapper.toEntity(gRNLotDTO);
        gRNLot = gRNLotRepository.save(gRNLot);
        return gRNLotMapper.toDto(gRNLot);
    }

    @Override
    public Optional<GRNLotDTO> partialUpdate(GRNLotDTO gRNLotDTO) {
        log.debug("Request to partially update GRNLot : {}", gRNLotDTO);

        return gRNLotRepository
            .findById(gRNLotDTO.getId())
            .map(existingGRNLot -> {
                gRNLotMapper.partialUpdate(existingGRNLot, gRNLotDTO);

                return existingGRNLot;
            })
            .map(gRNLotRepository::save)
            .map(gRNLotMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GRNLotDTO> findAll(Pageable pageable) {
        log.debug("Request to get all GRNLots");
        return gRNLotRepository.findAll(pageable).map(gRNLotMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<GRNLotDTO> findOne(Long id) {
        log.debug("Request to get GRNLot : {}", id);
        return gRNLotRepository.findById(id).map(gRNLotMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete GRNLot : {}", id);
        gRNLotRepository.deleteById(id);
    }
}
