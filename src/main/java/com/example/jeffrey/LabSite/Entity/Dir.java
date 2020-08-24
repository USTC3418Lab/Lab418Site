package com.example.jeffrey.LabSite.Entity;

import java.util.List;

public class Dir {
    private String title;
    private Boolean isLeaf;
    private List<Dir> children;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getLeaf() {
        return isLeaf;
    }

    public void setLeaf(Boolean leaf) {
        isLeaf = leaf;
    }

    public List<Dir> getChildren() {
        return children;
    }

    public void setChildren(List<Dir> children) {
        this.children = children;
    }

    @Override
    public String toString() {
        return "Dir{" +
                "title='" + title + '\'' +
                ", isLeaf=" + isLeaf +
                ", children=" + children +
                '}';
    }
}
