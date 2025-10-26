import React from "react";

const RoomCard = ({ room, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300">
      <img
        src={room.image || "https://source.unsplash.com/400x300/?room"}
        alt={room.type}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{room.type}</h3>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Room #:</span> {room.roomNumber}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Price:</span> ${room.price}
        </p>
        <p
          className={`font-semibold mb-4 ${
            room.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {room.available ? "Available" : "Occupied"}
        </p>

        {/* --- CHANGE IS HERE --- */}
        {/* The button is now always visible */}
        <button
          onClick={() => onBook(room)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Pay & Book
        </button>
      </div>
    </div>
  );
};

export default RoomCard;