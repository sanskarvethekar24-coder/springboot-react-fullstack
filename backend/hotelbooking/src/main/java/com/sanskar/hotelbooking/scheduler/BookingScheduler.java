package com.sanskar.hotelbooking.scheduler;

import com.sanskar.hotelbooking.models.Booking;
import com.sanskar.hotelbooking.models.Room;
import com.sanskar.hotelbooking.repository.BookingRepository;
import com.sanskar.hotelbooking.repository.RoomRepository;
import com.sanskar.hotelbooking.websocket.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

@Component
public class BookingScheduler {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private WebSocketService webSocketService;

    @Transactional
    @Scheduled(cron = "0 * * * * ?") // runs every minute for demo
    public void updateRoomAvailability() {
        LocalDateTime now = LocalDateTime.now();

        // Keep track of rooms we already updated this run
        Set<Long> updatedRooms = new HashSet<>();

        // Active bookings: mark room as NOT available
        List<Booking> bookingsToStart = bookingRepository.findByCheckInDateTimeLessThanEqualAndCheckOutDateTimeGreaterThan(now, now);
        for (Booking booking : bookingsToStart) {
            Room room = booking.getRoom();
            if (room.isAvailable() && !updatedRooms.contains(room.getId())) {
                room.setAvailable(false);
                roomRepository.save(room);
                webSocketService.sendSchedulerUpdate("Room " + room.getId() + " is now occupied (check-in)");
                updatedRooms.add(room.getId());
            }
        }

        // Check-out: mark room as available
        List<Booking> bookingsToComplete = bookingRepository.findByCheckOutDateTimeBefore(now);
        for (Booking booking : bookingsToComplete) {
            Room room = booking.getRoom();
            if (!room.isAvailable() && !updatedRooms.contains(room.getId())) {
                room.setAvailable(true);
                roomRepository.save(room);
                webSocketService.sendSchedulerUpdate("Room " + room.getId() + " is now available (check-out)");
                updatedRooms.add(room.getId());
            }
        }
    }
}
