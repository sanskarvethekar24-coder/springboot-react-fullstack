package com.sanskar.hotelbooking.service;

import com.sanskar.hotelbooking.models.Hotel;
import java.util.List;

public interface HotelService {

    Hotel createHotel(Hotel hotel);

    List<Hotel> getAllHotels();

    Hotel getHotelById(Long id);

    List<Hotel> getHotelsByLocation(String location);

    List<Hotel> getHotelsByName(String name);

    Hotel updateHotel(Hotel hotel);

    void deleteHotel(Long id);
}
