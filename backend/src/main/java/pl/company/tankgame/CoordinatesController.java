package pl.company.tankgame;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CoordinatesController {

    @MessageMapping("/hello")
    @SendTo("/topic/coordinates")
    public Coordinates greeting(Coordinates coordinates) throws Exception {
        return coordinates;
    }

}