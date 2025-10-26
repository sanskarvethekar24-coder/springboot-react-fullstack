import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (onRoomMessage, onBookingMessage) => {
  stompClient = new Client({
    webSocketFactory: () => new WebSocket("ws://localhost:8080/ws"), // direct WS
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
  });

  stompClient.onConnect = () => {
    console.log("Connected to WebSocket");

    // Subscribe to room status updates
    stompClient.subscribe("/topic/rooms", (message) => {
      onRoomMessage(message.body);
    });

    // Subscribe to booking updates
    stompClient.subscribe("/topic/bookings", (message) => {
      onBookingMessage(message.body);
    });
  };

  stompClient.activate();

  return () => {
    if (stompClient) stompClient.deactivate();
  };
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};
