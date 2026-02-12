package com.drissman.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionDto {
    private UUID id;
    private UUID enrollmentId;
    private UUID monitorId;
    private String studentName; // To display on planning
    private String monitorName; // To display on planning
    private String offerName; // To display on planning (e.g. "Permis B - 20h")
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String status;
    private String meetingPoint;
    private String pedagogicalNotes;
}
