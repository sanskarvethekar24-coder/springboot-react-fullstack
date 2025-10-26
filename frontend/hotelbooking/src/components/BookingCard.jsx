import React from "react";

const BookingCard = ({ booking }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300">
      {/* Booking Header */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Booking <span className="text-green-600">#{booking.id}</span>
      </h3>

      {/* Booking Details */}
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Hotel:</span>{" "}
          {booking.room?.hotel?.name || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Room:</span>{" "}
          {booking.room?.roomNumber || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Check-In:</span>{" "}
          {new Date(booking.checkInDateTime).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Check-Out:</span>{" "}
          {new Date(booking.checkOutDateTime).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Amount:</span>{" "}
          <span className="text-green-600 font-medium">
            ₹{booking.amount || 0}
          </span>
        </p>
      </div>

      {/* Payment Status */}
      <div className="mt-4 flex justify-start">
        {booking.isPaid ? (
          <span className="inline-block px-4 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full shadow-sm">
            ✅ Paid
          </span>
        ) : (
          <span className="inline-block px-4 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full shadow-sm">
            ⏳ Pending Payment
          </span>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
