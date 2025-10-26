package com.sanskar.hotelbooking.service;

import com.sanskar.hotelbooking.models.Room;
import com.sanskar.hotelbooking.repository.RoomRepository;
import com.sanskar.hotelbooking.websocket.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImplementation implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private WebSocketService webSocketService;

    @Override
    public Room createRoom(Room room) {
        Room saved = roomRepository.save(room);
        webSocketService.sendRoomUpdate("New room created: " + saved.getId());
        return saved;
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElse(null);
    }

    @Override
    public List<Room> getRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }

    @Override
    public List<Room> getAvailableRooms(Long hotelId) {
        return roomRepository.findByHotelIdAndAvailableTrue(hotelId);
    }

    @Override
    public List<Room> getRoomsByType(String type, Long hotelId) {
        return roomRepository.findByHotelIdAndTypeIgnoreCase(hotelId, type);
    }

    @Override
    public Room updateRoom(Room room) {
        Optional<Room> existingRoom = roomRepository.findById(room.getId());
        if (existingRoom.isPresent()) {
            Room updated = roomRepository.save(room);
            webSocketService.sendRoomUpdate("Room updated: " + updated.getId());
            return updated;
        } else return null;
    }

    @Override
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
        webSocketService.sendRoomUpdate("Room deleted: " + id);
    }
}
