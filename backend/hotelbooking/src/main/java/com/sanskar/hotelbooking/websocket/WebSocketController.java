package com.sanskar.hotelbooking.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    // Optional: receive messages from frontend
    @MessageMapping("/message")
    @SendTo("/topic/updates")
    public String receiveMessage(String message) {
        return "Update: " + message;
    }
}

