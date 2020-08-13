package com.example.jeffrey.LabSite.Entity.ConferenceSearch;

public class Paper {
    private String title;
    private String con;
    private String conference;
    private String Degree;

    public Paper(String title, String con, String conference) {
        this.title = title;
        this.con = con;
        this.conference = conference;
    }

    public Paper(String title, String con, String conference, String degree) {
        this.title = title;
        this.con = con;
        this.conference = conference;
        Degree = degree;
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

    public String getConference() {
        return conference;
    }

    public void setConference(String conference) {
        this.conference = conference;
    }

    public String getDegree() {
        return Degree;
    }

    public void setDegree(String degree) {
        Degree = degree;
    }

    @Override
    public String toString() {
        return "Paper{" +
                "title='" + title + '\'' +
                ", con='" + con + '\'' +
                ", conference='" + conference + '\'' +
                '}';
    }
}
