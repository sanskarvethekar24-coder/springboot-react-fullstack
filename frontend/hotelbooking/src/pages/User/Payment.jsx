import React, { useState } from "react";
import PaymentCard from "../../components/PaymentCard";
import { createBooking } from "../../api/bookings";

const Payment = ({ room, onClose }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [loading, setLoading] = useState(false);

  // Format date for Spring Boot LocalDateTime (YYYY-MM-DDTHH:mm:ss) in LOCAL time
  const formatLocalDateTime = (date) => {
    const pad = (n) => n.toString().padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds())
    );
  };

  const handlePayment = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out date & time!");
      return;
    }

    if (checkOut <= checkIn) {
      alert("Check-out time must be after check-in time!");
      return;
    }

    setLoading(true);

    const payload = {
      checkInDateTime: formatLocalDateTime(checkIn),
      checkOutDateTime: formatLocalDateTime(checkOut),
      user: { id: 1 }, // Hardcoded user ID
      room: { id: room.id },
    };

    console.log("Booking payload:", payload);

    try {
      const data = await createBooking(payload);
      console.log("Backend response:", data);

      alert(
        `Room booked successfully!\nCheck-in: ${checkIn.toLocaleString()}\nCheck-out: ${checkOut.toLocaleString()}\nAmount: ₹${room.price}`
      );

      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 2000);

    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      alert("Booking failed: " + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  return (
    <PaymentCard
      room={room}
      checkIn={checkIn}
      setCheckIn={setCheckIn}
      checkOut={checkOut}
      setCheckOut={setCheckOut}
      loading={loading}
      onClose={onClose}
      handlePayment={handlePayment}
    />
  );
};

export default Payment;
