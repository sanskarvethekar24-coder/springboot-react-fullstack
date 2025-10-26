package com.sanskar.hotelbooking.controller;

import com.sanskar.hotelbooking.exception.ResourceNotFoundException;
import com.sanskar.hotelbooking.models.Room;
import com.sanskar.hotelbooking.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Create a new room
    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomService.createRoom(room);
    }

    // Get all rooms
    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    // Get room by ID
    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id) {
        Room room = roomService.getRoomById(id);
        if (room != null) {
            return room;
        } else {
            throw new ResourceNotFoundException("Room not found with id " + id);
        }
    }

    // Get all rooms in a hotel
    @GetMapping("/hotel/{hotelId}")
    public List<Room> getRoomsByHotel(@PathVariable Long hotelId) {
        List<Room> rooms = roomService.getRoomsByHotel(hotelId);
        if (!rooms.isEmpty()) {
            return rooms;
        } else {
            throw new ResourceNotFoundException("No rooms found in hotel with id " + hotelId);
        }
    }

    // Get all available rooms in a hotel
    @GetMapping("/available/{hotelId}")
    public List<Room> getAvailableRooms(@PathVariable Long hotelId) {
        List<Room> rooms = roomService.getAvailableRooms(hotelId);
        if (!rooms.isEmpty()) {
            return rooms;
        } else {
            throw new ResourceNotFoundException("No available rooms in hotel with id " + hotelId);
        }
    }

    // Get rooms in a hotel by type (case-insensitive)
    @GetMapping("/type/{type}")
    public List<Room> getRoomsByType(@PathVariable String type, @PathVariable Long hotelId) {
        List<Room> rooms = roomService.getRoomsByType(type, hotelId);
        if (!rooms.isEmpty()) {
            return rooms;
        } else {
            throw new ResourceNotFoundException("No rooms of type '" + type);
        }
    }

    // Update room
    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room room) {
        room.setId(id);
        Room updatedRoom = roomService.updateRoom(room);
        if (updatedRoom != null) {
            return updatedRoom;
        } else {
            throw new ResourceNotFoundException("Room not found with id " + id);
        }
    }

    // Delete room
    @DeleteMapping("/{id}")
    public String deleteRoom(@PathVariable Long id) {
        Room room = roomService.getRoomById(id);
        if (room != null) {
            roomService.deleteRoom(id);
            return "Room deleted successfully";
        } else {
            throw new ResourceNotFoundException("Room not found with id " + id);
        }
    }
}
