package pl.company.tankgame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;



    @GetMapping(value = "/users", produces = "application/json")
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

    @PostMapping("/login")
    public ResponseEntity<User> getUserByUsername(@RequestBody UserLoginDto user ){

        try {
            List<User> userData = userRepository.findUserByUsernameAndPassword(user.getUsername(), user.getPassword());
            return new ResponseEntity<>(userData.get(0), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/registration")
    public ResponseEntity<?> createUser(@RequestBody User user) {

//        try {
//            userRepository.findUserByUsername(user.getUsername());
//            return new ResponseEntity<>(createError("username-exists"), HttpStatus.INTERNAL_SERVER_ERROR);
//        } catch (Exception ignored) {
//        }
//        try {
//            List<User> userData = userRepository.findUserByEmail(user.getEmail());
//            return new ResponseEntity<>(createError("email-address-exists"), HttpStatus.INTERNAL_SERVER_ERROR);
//        } catch (Exception ignored) {
//        }

        try {
            User _user = userRepository.save(new User(user.getUsername(), user.getPassword(), user.getEmail()));
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<ErrorResponse> createError(String message){
        return new ResponseEntity<>(new ErrorResponse(message),HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
