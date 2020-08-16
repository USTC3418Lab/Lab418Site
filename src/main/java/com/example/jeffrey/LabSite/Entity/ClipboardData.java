package com.example.jeffrey.LabSite.Entity;

public class ClipboardData {
    int id;
    String text;
    long timestamp;

    public ClipboardData(int id, String text, long timestamp) {
        this.id = id;
        this.text = text;
        this.timestamp = timestamp;
    }

    public int getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}