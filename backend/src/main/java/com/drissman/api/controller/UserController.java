package com.drissman.api.controller;

import com.drissman.api.dto.ChangePasswordRequest;
import com.drissman.api.dto.UpdateProfileRequest;
import com.drissman.api.dto.UserDto;
import com.drissman.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public Mono<UserDto> getUser(@PathVariable UUID id) {
        return userService.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Utilisateur non trouvé")));
    }

    @PutMapping("/{id}")
    public Mono<UserDto> updateProfile(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateProfileRequest request) {
        return userService.updateProfile(id, request);
    }

    @PutMapping("/{id}/password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> changePassword(
            @PathVariable UUID id,
            @Valid @RequestBody ChangePasswordRequest request) {
        return userService.changePassword(id, request);
    }
}
