package com.sanskar.hotelbooking.service;

import com.sanskar.hotelbooking.models.Booking;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingService {

    Booking createBooking(Booking booking);

    List<Booking> getAllBookings();

    Booking getBookingById(Long id);

    List<Booking> getBookingsByUser(Long userId);

    List<Booking> getBookingsByRoom(Long roomId);

    Booking updateBooking(Booking booking);

    void deleteBooking(Long id);

    // For scheduler (using LocalDateTime now)
    List<Booking> getBookingsByCheckInDateLessThanEqual(LocalDateTime now);

    List<Booking> getBookingsByCheckOutDateBefore(LocalDateTime now);
}
