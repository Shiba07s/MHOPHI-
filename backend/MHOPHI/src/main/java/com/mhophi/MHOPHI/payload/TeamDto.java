package com.mhophi.MHOPHI.payload;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamDto {

    private Integer teamId;
    private LocalDateTime createdAt;
    private String name;
    private String description;
}