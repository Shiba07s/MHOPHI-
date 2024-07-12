package com.mhophi.MHOPHI.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Service;

import com.mhophi.MHOPHI.entities.Team;
import com.mhophi.MHOPHI.payload.TeamDto;
import com.mhophi.MHOPHI.repositories.TeamRepository;
import com.mhophi.MHOPHI.services.TeamService;


@Service
public class TeamServiceImpl implements TeamService {
	
	@Autowired
	private TeamRepository teamRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public TeamDto createNewTeam(TeamDto teamDto) {
		Team map = modelMapper.map(teamDto, Team.class);
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TeamDto> getTeamDetails() {
		// TODO Auto-generated method stub
		return null;
	}
 

}
