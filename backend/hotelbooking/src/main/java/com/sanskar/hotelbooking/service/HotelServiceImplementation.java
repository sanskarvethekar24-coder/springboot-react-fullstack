package com.sanskar.hotelbooking.service;

import com.sanskar.hotelbooking.models.Hotel;
import com.sanskar.hotelbooking.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelServiceImplementation implements HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @Override
    public Hotel getHotelById(Long id) {
        Optional<Hotel> hotel = hotelRepository.findById(id);
        if (hotel.isPresent()) {
            return hotel.get();
        } else {
            return null; // controller will throw error if null
        }
    }

    @Override
    public List<Hotel> getHotelsByLocation(String location) {
        return hotelRepository.findByLocation(location);
    }

    @Override
    public List<Hotel> getHotelsByName(String name) {
        return hotelRepository.findByName(name);
    }

    @Override
    public Hotel updateHotel(Hotel hotel) {
        Optional<Hotel> existingHotel = hotelRepository.findById(hotel.getId());
        if (existingHotel.isPresent()) {
            return hotelRepository.save(hotel);
        } else {
            return null; // controller will throw error if null
        }
    }

    @Override
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}
