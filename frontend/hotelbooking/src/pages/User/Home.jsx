import React, { useEffect, useState } from "react";
import HotelCard from "../../components/HotelCard";
import Rooms from "./Rooms";
import { getAllHotels, getHotelsByLocation, getHotelsByName } from "../../api/hotels";
import { getToken, decodeRole } from "../../utils/auth";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [user, setUser] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = decodeRole(token, true);
      setUser(decoded);
    }

    const fetchHotels = async () => {
      const data = await getAllHotels();
      setHotels(data);
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchByLocation = async () => {
      if (searchLocation.trim() === "") return;
      try {
        const data = await getHotelsByLocation(searchLocation);
        setHotels(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchByLocation();
  }, [searchLocation]);

  useEffect(() => {
    const fetchByName = async () => {
      if (searchName.trim() === "") return;
      try {
        const data = await getHotelsByName(searchName);
        setHotels(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchByName();
  }, [searchName]);

  return (
    <div className="pt-24 p-6 bg-green-50 min-h-screen">
      {!selectedHotel ? (
        <div>
          {/* Search Inputs */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by hotel name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="border-1 border-gray-300 px-4 py-2 rounded-lg shadow-lg focus:border-black focus:ring-0 focus:outline-none focus:border-3 transition-all duration-200 flex-1"
            />
            <input
              type="text"
              placeholder="Search by location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="border-1 border-gray-300 px-4 py-2 rounded-lg shadow-lg focus:border-black focus:ring-0 focus:outline-none focus:border-3 transition-all duration-200 flex-1"
            />
          </div>

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="transform hover:scale-105 hover:shadow-xl transition-transform duration-300"
              >
                <HotelCard
                  hotel={hotel}
                  searchName={searchName}
                  searchLocation={searchLocation}
                />
                <button
                  className="mt-3 w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-2 rounded-lg shadow-lg transition-colors duration-200 font-medium"
                  onClick={() => setSelectedHotel(hotel)}
                >
                  View Rooms
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            className="mb-4 border border-green-500 text-green-600 px-4 py-2 rounded-lg shadow hover:bg-green-600 hover:text-white transition-colors duration-200"
            onClick={() => setSelectedHotel(null)}
          >
            Back to Hotels
          </button>
          <Rooms hotelId={selectedHotel.id} user={user} />
        </div>
      )}
    </div>
  );
};

export default Home;
