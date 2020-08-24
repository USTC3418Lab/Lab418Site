package com.example.jeffrey.LabSite;

import com.example.jeffrey.LabSite.Service.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import static com.example.jeffrey.LabSite.Utils.PdfOperation.initDegreeSet;

@SpringBootApplication
public class LabSiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(LabSiteApplication.class, args);
        initDegreeSet();
    }
}
