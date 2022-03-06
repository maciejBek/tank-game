package pl.company.tankgame.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;
import pl.company.tankgame.model.Coordinates;

@Controller
public class CoordinatesController {

    private final SimpUserRegistry simpUserRegistry;

    @Autowired
    public CoordinatesController(SimpUserRegistry simpUserRegistry) {
        this.simpUserRegistry = simpUserRegistry;
    }


    @MessageMapping("/hello/{roomId}")
    @SendTo("/topic/coordinates/{roomId}")
    public Coordinates greeting(@DestinationVariable Integer roomId, Coordinates coordinates, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        System.out.println(headerAccessor.getSessionId());
//        System.out.println(this.simpUserRegistry
//                .getUsers()
//                .stream()
//                .map(SimpUser::getName)
//                .collect(Collectors.toList()));

        System.out.println(this.simpUserRegistry.getUsers());


        return coordinates;
    }

}