package pl.company.tankgame;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
//
    public ResponseEntity<?> getUserByEmail(String email) {
        Optional<User> userData = this.userRepository.findUserByEmail(email);
        if (userData.isPresent()) {
            User fetchedUser = userData.get();
            return new ResponseEntity<>(fetchedUser, HttpStatus.OK);
        } else {
            ErrorResponse errorResponse = new ErrorResponse("user-does-not-exist");
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
//
//    public ResponseEntity<?> addUser(UserRegistrationDto userRegistrationDto) {
//        String username = userRegistrationDto.getUsername();
//        String password = userRegistrationDto.getPassword();
//        String email = userRegistrationDto.getEmail();
//
//        User user = new User(username, password, email);
//
//        String addedUserId = this.userRepository.save(user).getId();
//
//        return new ResponseEntity<>(Map.of("id", addedUserId), HttpStatus.OK);
//    }

}
