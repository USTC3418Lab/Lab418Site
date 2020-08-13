package com.example.jeffrey.LabSite.Entity.ConferenceSearch;

public class Paper {
    private String title;
    private String con;

    public Paper(String title, String con) {
        this.title = title;
        this.con = con;
    }
    public Paper(){

    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCon() {
        return con;
    }

    public void setCon(String con) {
        this.con = con;
    }

    @Override
    public String toString() {
        return "Paper{" +
                "title='" + title + '\'' +
                ", con='" + con + '\'' +
                '}';
    }
}
