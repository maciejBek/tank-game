package pl.company.tankgame.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.company.tankgame.ErrorResponse;
import pl.company.tankgame.model.User;
import pl.company.tankgame.dto.UserLoginDto;
import pl.company.tankgame.service.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/users", produces = "application/json")
    public ResponseEntity<List<User>> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @PostMapping("/login")
    public ResponseEntity<User> getUserByUsername(@RequestBody UserLoginDto user) {
        return this.userService.getUserByUsername(user);
    }

    @PostMapping("/registration")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        return this.userService.createUser(user);
    }

    public ResponseEntity<ErrorResponse> createError(String message){
        return new ResponseEntity<>(new ErrorResponse(message),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}