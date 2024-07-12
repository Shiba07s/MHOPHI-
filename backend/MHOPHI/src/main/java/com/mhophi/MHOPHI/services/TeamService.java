package com.mhophi.MHOPHI.services;

import java.util.List;

import com.mhophi.MHOPHI.payload.TeamDto;

public interface TeamService {
	
	TeamDto createNewTeam(TeamDto teamDto);
	
	List<TeamDto> getTeamDetails();

}
