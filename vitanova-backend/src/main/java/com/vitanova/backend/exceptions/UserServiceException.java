package com.vitanova.backend.exceptions;

public class UserServiceException extends RuntimeException {
    public UserServiceException(String msg, Throwable cause) {
        super(msg, cause);
    }
}