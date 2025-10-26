package com.sanskar.hotelbooking.service;

import com.sanskar.hotelbooking.models.Room;
import java.util.List;

public interface RoomService {

    Room createRoom(Room room);

    List<Room> getAllRooms();

    Room getRoomById(Long id);

    List<Room> getRoomsByHotel(Long hotelId);

    List<Room> getAvailableRooms(Long hotelId);

    List<Room> getRoomsByType(String type, Long hotelId);

    Room updateRoom(Room room);

    void deleteRoom(Long id);
}
