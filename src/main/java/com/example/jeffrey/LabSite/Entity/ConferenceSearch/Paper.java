package com.example.jeffrey.LabSite.Entity.ConferenceSearch;

public class Paper {
    private String title;
    private String href;
    private String conference;
    private String Degree;

    public Paper(String title, String href, String conference) {
        this.title = title;
        this.href = href;
        this.conference = conference;
    }

    public Paper() {
    }

    public Paper(String title, String href, String conference, String degree) {
        this.title = title;
        this.href = href;
        this.conference = conference;
        Degree = degree;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
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
                ", href='" + href + '\'' +
                ", conference='" + conference + '\'' +
                ", Degree='" + Degree + '\'' +
                '}';
    }
}
