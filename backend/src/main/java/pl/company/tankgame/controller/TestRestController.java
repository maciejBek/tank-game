package pl.company.tankgame.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestRestController {

    TestRestController() {

    }

    @GetMapping("/siema")
    public String siema(){
     return "Elo!";
    }
}
