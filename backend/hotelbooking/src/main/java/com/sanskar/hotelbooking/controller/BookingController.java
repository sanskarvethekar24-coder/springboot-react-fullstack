package com.sanskar.hotelbooking.controller;

import com.sanskar.hotelbooking.exception.ResourceNotFoundException;
import com.sanskar.hotelbooking.models.Booking;
import com.sanskar.hotelbooking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create a new booking
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    // Get all bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Get booking by ID
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        if (booking != null) {
            return booking;
        } else {
            throw new ResourceNotFoundException("Booking not found with id " + id);
        }
    }

    // Get bookings by user ID
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getBookingsByUser(userId);
        if (!bookings.isEmpty()) {
            return bookings;
        } else {
            throw new ResourceNotFoundException("No bookings found for user with id " + userId);
        }
    }

    // Get bookings by room ID
    @GetMapping("/room/{roomId}")
    public List<Booking> getBookingsByRoom(@PathVariable Long roomId) {
        List<Booking> bookings = bookingService.getBookingsByRoom(roomId);
        if (!bookings.isEmpty()) {
            return bookings;
        } else {
            throw new ResourceNotFoundException("No bookings found for room with id " + roomId);
        }
    }

    // Update booking
    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        booking.setId(id);
        Booking updatedBooking = bookingService.updateBooking(booking);
        if (updatedBooking != null) {
            return updatedBooking;
        } else {
            throw new ResourceNotFoundException("Booking not found with id " + id);
        }
    }

    // Delete booking
    @DeleteMapping("/{id}")
    public String deleteBooking(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        if (booking != null) {
            bookingService.deleteBooking(id);
            return "Booking deleted successfully";
        } else {
            throw new ResourceNotFoundException("Booking not found with id " + id);
        }
    }
}
