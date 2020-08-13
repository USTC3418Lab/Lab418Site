package com.example.jeffrey.LabSite.Entity.ConferenceSearch;

public class ReponsePaper {
    private String title;
    private String con_abbr;
    private String con;

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

    public String getCon() {
        return con;
    }

    public void setCon(String con) {
        this.con = con;
    }

    public ReponsePaper(String title, String con_abbr, String con) {
        this.title = title;
        this.con_abbr = con_abbr;
        this.con = con;
    }
    public ReponsePaper(){

    }
}
