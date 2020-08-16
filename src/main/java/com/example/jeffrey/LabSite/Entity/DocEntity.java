package com.example.jeffrey.LabSite.Entity;

import java.io.Serializable;

public class DocEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    private String title;
    private String paragraph;
    private Long timestamp;

    public DocEntity(String title, String paragraph, Long timestamp) {
        this.title = title;
        this.paragraph = paragraph;
        this.timestamp = timestamp;
    }
    public DocEntity(){

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getParagraph() {
        return paragraph;
    }

    public void setParagraph(String paragraph) {
        this.paragraph = paragraph;
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
                ", paragraph='" + paragraph + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
