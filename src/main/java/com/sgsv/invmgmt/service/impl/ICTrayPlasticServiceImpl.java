package com.sgsv.invmgmt.service.impl;

import com.sgsv.invmgmt.domain.ICTrayPlastic;
import com.sgsv.invmgmt.repository.ICTrayPlasticRepository;
import com.sgsv.invmgmt.service.ICTrayPlasticService;
import com.sgsv.invmgmt.service.dto.ICTrayPlasticDTO;
import com.sgsv.invmgmt.service.mapper.ICTrayPlasticMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ICTrayPlastic}.
 */
@Service
@Transactional
public class ICTrayPlasticServiceImpl implements ICTrayPlasticService {

    private final Logger log = LoggerFactory.getLogger(ICTrayPlasticServiceImpl.class);

    private final ICTrayPlasticRepository iCTrayPlasticRepository;

    private final ICTrayPlasticMapper iCTrayPlasticMapper;

    public ICTrayPlasticServiceImpl(ICTrayPlasticRepository iCTrayPlasticRepository, ICTrayPlasticMapper iCTrayPlasticMapper) {
        this.iCTrayPlasticRepository = iCTrayPlasticRepository;
        this.iCTrayPlasticMapper = iCTrayPlasticMapper;
    }

    @Override
    public ICTrayPlasticDTO save(ICTrayPlasticDTO iCTrayPlasticDTO) {
        log.debug("Request to save ICTrayPlastic : {}", iCTrayPlasticDTO);
        ICTrayPlastic iCTrayPlastic = iCTrayPlasticMapper.toEntity(iCTrayPlasticDTO);
        iCTrayPlastic = iCTrayPlasticRepository.save(iCTrayPlastic);
        return iCTrayPlasticMapper.toDto(iCTrayPlastic);
    }

    @Override
    public ICTrayPlasticDTO update(ICTrayPlasticDTO iCTrayPlasticDTO) {
        log.debug("Request to save ICTrayPlastic : {}", iCTrayPlasticDTO);
        ICTrayPlastic iCTrayPlastic = iCTrayPlasticMapper.toEntity(iCTrayPlasticDTO);
        iCTrayPlastic = iCTrayPlasticRepository.save(iCTrayPlastic);
        return iCTrayPlasticMapper.toDto(iCTrayPlastic);
    }

    @Override
    public Optional<ICTrayPlasticDTO> partialUpdate(ICTrayPlasticDTO iCTrayPlasticDTO) {
        log.debug("Request to partially update ICTrayPlastic : {}", iCTrayPlasticDTO);

        return iCTrayPlasticRepository
            .findById(iCTrayPlasticDTO.getId())
            .map(existingICTrayPlastic -> {
                iCTrayPlasticMapper.partialUpdate(existingICTrayPlastic, iCTrayPlasticDTO);

                return existingICTrayPlastic;
            })
            .map(iCTrayPlasticRepository::save)
            .map(iCTrayPlasticMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ICTrayPlasticDTO> findAll() {
        log.debug("Request to get all ICTrayPlastics");
        return iCTrayPlasticRepository.findAll().stream().map(iCTrayPlasticMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ICTrayPlasticDTO> findOne(Long id) {
        log.debug("Request to get ICTrayPlastic : {}", id);
        return iCTrayPlasticRepository.findById(id).map(iCTrayPlasticMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ICTrayPlastic : {}", id);
        iCTrayPlasticRepository.deleteById(id);
    }
}
