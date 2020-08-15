package com.example.jeffrey.LabSite.Entity.ConferenceSearch;

public class Paper {
    private String title;
    private String con_abbr;
    private String conference;
    private String Degree;

    public Paper(String title, String con_abbr, String conference) {
        this.title = title;
        this.con_abbr = con_abbr;
        this.conference = conference;
    }

    public Paper(String title, String con_abbr, String conference, String degree) {
        this.title = title;
        this.con_abbr = con_abbr;
        this.conference = conference;
        Degree = degree;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCon_abbr() {
        return con_abbr;
    }

    public void setCon_abbr(String con_abbr) {
        this.con_abbr = con_abbr;
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
                ", con='" + con_abbr + '\'' +
                ", conference='" + conference + '\'' +
                '}';
    }
}
