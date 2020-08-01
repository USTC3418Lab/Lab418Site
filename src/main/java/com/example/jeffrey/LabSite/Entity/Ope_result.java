package com.example.jeffrey.LabSite.Entity;

public class Ope_result {
    private String operation;
    private int code;
    private String message;

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Ope_result{" +
                "operation='" + operation + '\'' +
                ", code=" + code +
                ", message='" + message + '\'' +
                '}';
    }
}
