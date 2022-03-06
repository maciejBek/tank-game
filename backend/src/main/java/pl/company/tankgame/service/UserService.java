package pl.company.tankgame.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import pl.company.tankgame.dto.UserLoginDto;
import pl.company.tankgame.model.User;
import pl.company.tankgame.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = new ArrayList<User>(userRepository.findAll());
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<User> getUserByUsername(@RequestBody UserLoginDto user ){
        try {
            List<User> userData = userRepository.findUserByUsernameAndPassword(user.getUsername(), user.getPassword());
            return new ResponseEntity<>(userData.get(0), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User fetchedUser = userRepository.save(new User(user.getUsername(), user.getPassword(), user.getEmail()));
            return new ResponseEntity<>(fetchedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}