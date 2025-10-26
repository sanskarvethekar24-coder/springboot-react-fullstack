# Hotel Booking System (HotelBooking1)

This is a full-stack hotel booking project. Users can browse rooms, make reservations, and manage their bookings. The admin can manage rooms and user bookings.

---

## Tech Stack

* *Frontend:* React
* *Backend:* Spring Boot
* *Database:* MySQL

---

## How to Run This Project

### 1. Prerequisites
* Java 17 (or your version)
* Node.js (v18 or your version)
* MySQL Server

### 2. Backend Setup (Spring Boot)
First, set up the database.
1.  Open your MySQL server and create a new database:
    CREATE DATABASE your_db_name;
2.  In the /backend folder, create an application.properties file.
3.  Copy the contents from application.properties.example and fill in your database username and password.
4.  Run the backend:
    bash
    # Navigate to the backend folder
    cd backend
    
    # Run the Spring Boot app
    mvn spring-boot:run
    
The backend will be running on http://localhost:8080.

### 3. Frontend Setup (React)
1.  Open a *new* terminal.
2.  Navigate to the frontend folder:
    bash
    # Navigate to the frontend folder
    cd frontend
    
    # Install all the necessary packages
    npm install
    
    # Start the React app
    npm start
    
The frontend will open in your browser at http://localhost:3000.
