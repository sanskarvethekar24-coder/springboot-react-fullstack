package com.sanskar.hotelbooking.service;

import com.sanskar.hotelbooking.models.Booking;
import com.sanskar.hotelbooking.models.Room;
import com.sanskar.hotelbooking.models.User;
import com.sanskar.hotelbooking.repository.BookingRepository;
import com.sanskar.hotelbooking.repository.RoomRepository;
import com.sanskar.hotelbooking.repository.UserRepository;
import com.sanskar.hotelbooking.websocket.WebSocketService;
//import com.sanskar.hotelbooking.payment.PaymentService;
import com.razorpay.Order;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImplementation implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WebSocketService webSocketService;

    @Override
    public Booking createBooking(Booking booking) {
        // 1️⃣ Check for overlapping bookings
        List<Booking> newBookings = bookingRepository
                .findByRoomIdAndCheckInDateTimeLessThanEqualAndCheckOutDateTimeGreaterThanEqual(
                        booking.getRoom().getId(),
                        booking.getCheckInDateTime(),
                        booking.getCheckOutDateTime()
                );

        if (!newBookings.isEmpty()) {
            throw new RuntimeException("Room is already booked for the selected date-time range.");
        }

        // 2️⃣ Fetch managed Room
        Optional<Room> roomOpt = roomRepository.findById(booking.getRoom().getId());
        if (roomOpt.isPresent()) {
            booking.setRoom(roomOpt.get());
        } else {
            return null; // controller will handle error
        }

        // 3️⃣ Fetch managed User
        Optional<User> userOpt = userRepository.findById(booking.getUser().getId());
        if (userOpt.isPresent()) {
            booking.setUser(userOpt.get());
        } else {
            return null; // controller will handle error
        }

        // 4️⃣ Save booking (Room.available handled by scheduler)
        Booking saved = bookingRepository.save(booking);
        webSocketService.sendBookingUpdate("New booking created for room " + booking.getRoom().getId());

        return saved;
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        return booking.orElse(null); // controller will throw error
    }

    @Override
    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public List<Booking> getBookingsByRoom(Long roomId) {
        return bookingRepository.findByRoomId(roomId);
    }

    @Override
    public Booking updateBooking(Booking booking) {
        Optional<Booking> existingBooking = bookingRepository.findById(booking.getId());
        if (existingBooking.isPresent()) {
            // Fetch managed Room
            Optional<Room> roomOpt = roomRepository.findById(booking.getRoom().getId());
            if (roomOpt.isPresent()) {
                booking.setRoom(roomOpt.get());
            } else {
                return null; // controller will throw error
            }

            // Fetch managed User
            Optional<User> userOpt = userRepository.findById(booking.getUser().getId());
            if (userOpt.isPresent()) {
                booking.setUser(userOpt.get());
            } else {
                return null; // controller will throw error
            }

            Booking updated = bookingRepository.save(booking);
            webSocketService.sendBookingUpdate("Booking updated for room " + booking.getRoom().getId());
            return updated;
        } else {
            return null; // controller will throw error
        }
    }

    @Override
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
        webSocketService.sendBookingUpdate("Booking deleted with ID " + id);
    }

    // -------------- Scheduler Methods --------------
    @Override
    public List<Booking> getBookingsByCheckInDateLessThanEqual(LocalDateTime now) {
        return bookingRepository.findByCheckInDateTimeLessThanEqual(now);
    }

    @Override
    public List<Booking> getBookingsByCheckOutDateBefore(LocalDateTime now) {
        return bookingRepository.findByCheckOutDateTimeBefore(now);
    }
}
