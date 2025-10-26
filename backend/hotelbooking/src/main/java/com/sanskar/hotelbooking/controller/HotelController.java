package com.sanskar.hotelbooking.controller;

import com.sanskar.hotelbooking.exception.ResourceNotFoundException;
import com.sanskar.hotelbooking.models.Hotel;
import com.sanskar.hotelbooking.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    // Create a new hotel
    @PostMapping
    public Hotel createHotel(@RequestBody Hotel hotel) {
        return hotelService.createHotel(hotel);
    }

    // Get all hotels
    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    // Get hotel by ID
    @GetMapping("/{id}")
    public Hotel getHotelById(@PathVariable Long id) {
        Hotel hotel = hotelService.getHotelById(id);
        if (hotel != null) {
            return hotel;
        } else {
            throw new ResourceNotFoundException("Hotel not found with id " + id);
        }
    }

    // Get hotels by location
    @GetMapping("/location/{location}")
    public List<Hotel> getHotelsByLocation(@PathVariable String location) {
        List<Hotel> hotels = hotelService.getHotelsByLocation(location);
        if (!hotels.isEmpty()) {
            return hotels;
        } else {
            throw new ResourceNotFoundException("No hotels found at location " + location);
        }
    }

    // Get hotels by name
    @GetMapping("/name/{name}")
    public List<Hotel> getHotelsByName(@PathVariable String name) {
        List<Hotel> hotels = hotelService.getHotelsByName(name);
        if (!hotels.isEmpty()) {
            return hotels;
        } else {
            throw new ResourceNotFoundException("No hotels found with name " + name);
        }
    }

    // Update hotel
    @PutMapping("/{id}")
    public Hotel updateHotel(@PathVariable Long id, @RequestBody Hotel hotel) {
        hotel.setId(id);
        Hotel updatedHotel = hotelService.updateHotel(hotel);
        if (updatedHotel != null) {
            return updatedHotel;
        } else {
            throw new ResourceNotFoundException("Hotel not found with id " + id);
        }
    }

    // Delete hotel
    @DeleteMapping("/{id}")
    public String deleteHotel(@PathVariable Long id) {
        Hotel hotel = hotelService.getHotelById(id);
        if (hotel != null) {
            hotelService.deleteHotel(id);
            return "Hotel deleted successfully";
        } else {
            throw new ResourceNotFoundException("Hotel not found with id " + id);
        }
    }
}
