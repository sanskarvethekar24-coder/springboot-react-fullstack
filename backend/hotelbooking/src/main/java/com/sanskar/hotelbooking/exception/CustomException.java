package com.sanskar.hotelbooking.exception;

public class CustomException extends RuntimeException {

    public CustomException(String message) {
        super(message);
    }

    public CustomException() {
        super();
    }
}

