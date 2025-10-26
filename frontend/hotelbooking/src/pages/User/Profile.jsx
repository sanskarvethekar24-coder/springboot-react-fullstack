import React, { useEffect, useState } from "react";
import BookingCard from "../../components/BookingCard";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Default user ID = 1 for testing
  const userId = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user info
        const userResponse = await fetch(`http://localhost:8080/users/${userId}`);
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch bookings for user
        const bookingResponse = await fetch(`http://localhost:8080/bookings/user/${userId}`);
        const bookingData = await bookingResponse.json();
        setBookings(bookingData);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchData();
  }, [userId]);

  if (!user) return <p className="text-center mt-32 text-lg">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-4 md:px-12 pb-12">
      {/* Profile Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800">{user.username}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* Booking History */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
