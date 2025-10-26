import React, { useEffect, useState } from "react";
import { getRoomsByHotelId } from "../../api/rooms";
import PaymentCard from "./Payment"; // import the payment modal

const RoomCard = ({ room, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300">
      <img
        src={room.image || "https://source.unsplash.com/400x300/?room"}
        alt={room.type}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{room.type}</h3>
        <p>Room #: {room.roomNumber}</p>
        <p>Price: ₹{room.price}</p>
        <p className={room.available ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
          {room.available ? "Available" : "Occupied"}
        </p>

        {/* --- CHANGE IS HERE --- */}
        {/* The button is no longer wrapped in a condition */}
        <button
          onClick={() => onBook(room)}
          className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-medium shadow-lg transition-all duration-200"
        >
          Book & Pay
        </button>
      </div>
    </div>
  );
};

const Rooms = ({ hotelId, user }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRoomsByHotelId(hotelId);
      setRooms(data);
    };
    fetchRooms();
  }, [hotelId]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onBook={setSelectedRoom} />
        ))}
      </div>

      {selectedRoom && (
        <PaymentCard
          room={selectedRoom}
          user={user}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
};

export default Rooms;
