package com.example.jeffrey.LabSite.Entity;

import java.io.Serializable;

public class DocEntity implements Serializable {
    private String title;
    private String paragragh;
    private Long timestamp;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getParagragh() {
        return paragragh;
    }

    public void setParagragh(String paragragh) {
        this.paragragh = paragragh;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "DocEntity{" +
                "title='" + title + '\'' +
                ", paragragh='" + paragragh + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
