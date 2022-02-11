package pl.company.tankgame;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import pl.company.tankgame.User;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface UserRepository extends MongoRepository<User, Integer> {

    List<User> findUserByUsernameAndEmail(String username, String email);
    List<User> findUserByUsername(String username);
    List<User> findUserByEmail(String username);
    List<User> findUserByUsernameAndPassword(String username, String password);

}