package com.sanskar.hotelbooking.repository;

import com.sanskar.hotelbooking.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCheckInDateTimeLessThanEqual(LocalDateTime now);

    List<Booking> findByCheckOutDateTimeBefore(LocalDateTime now);

    List<Booking> findByUserId(Long userId);

    List<Booking> findByRoomId(Long roomId);

    List<Booking> findByRoomIdAndCheckInDateTimeLessThanEqualAndCheckOutDateTimeGreaterThanEqual(
            Long roomId,
            LocalDateTime requestedCheckOut,
            LocalDateTime requestedCheckIn
    );

    List<Booking> findByCheckInDateTimeLessThanEqualAndCheckOutDateTimeGreaterThan(
            LocalDateTime now1,
            LocalDateTime now2
    );
}
