package com.sanskar.hotelbooking.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Booking updates
    public void sendBookingUpdate(String message) {
        messagingTemplate.convertAndSend("/topic/bookings", message);
    }

    // Room updates
    public void sendRoomUpdate(String message) {
        messagingTemplate.convertAndSend("/topic/rooms", message);
    }

    // Scheduler updates
    public void sendSchedulerUpdate(String message) {
        messagingTemplate.convertAndSend("/topic/scheduler", message);
    }

    // Optional generic update
    public void sendUpdate(String message) {
        messagingTemplate.convertAndSend("/topic/updates", message);
    }
}
