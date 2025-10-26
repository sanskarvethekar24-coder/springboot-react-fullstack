package com.sanskar.hotelbooking.repository;

import com.sanskar.hotelbooking.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    // Find all rooms in a hotel
    List<Room> findByHotelId(Long hotelId);

    // Find all available rooms in a hotel
    List<Room> findByHotelIdAndAvailableTrue(Long hotelId);

    // Case-insensitive room type search in a hotel
    List<Room> findByHotelIdAndTypeIgnoreCase(Long hotelId, String type);

}
