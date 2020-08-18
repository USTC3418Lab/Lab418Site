package com.example.jeffrey.LabSite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import static com.example.jeffrey.LabSite.Utils.PdfOperation.initDegreeSet;

@SpringBootApplication
public class LabSiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(LabSiteApplication.class, args);
        initDegreeSet();
    }

}
