package pl.company.tankgame.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.company.tankgame.model.User;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, Integer> {

    List<User> findUserByUsernameAndEmail(String username, String email);
    List<User> findUserByUsername(String username);
    List<User> findUserByEmail(String username);
    List<User> findUserByUsernameAndPassword(String username, String password);
}