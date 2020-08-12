package com.example.jeffrey.LabSite.Entity;

public class Ope_Result {
    private int code;
    private String message;

    public Ope_Result(int code, String message) {
        this.code = code;
        this.message = message;
    }
    public Ope_Result(){

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
                ", code=" + code +
                ", message='" + message + '\'' +
                '}';
    }
}
