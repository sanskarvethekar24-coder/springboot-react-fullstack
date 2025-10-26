import React from "react";

// Highlight matched text
const highlightText = (text, search) => {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-yellow-400 font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const HotelCard = ({ hotel, searchName, searchLocation }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
      <img
        src={hotel.image || "https://source.unsplash.com/400x300/?hotel"}
        alt={hotel.name}
        className="w-full h-48 object-cover rounded-lg mb-2"
      />
      <h3 className="text-xl font-semibold">
        {highlightText(hotel.name, searchName)}
      </h3>
      <p className="text-gray-600">
        {highlightText(hotel.location, searchLocation)}
      </p>
    </div>
  );
};

export default HotelCard;
