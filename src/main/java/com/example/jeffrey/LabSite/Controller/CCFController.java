package com.example.jeffrey.LabSite.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.example.jeffrey.LabSite.Utils.StaticHtmlCrawler.getABCByPaper;

@RestController
public class CCFController {
    @RequestMapping("/ccf")
    public List<String> getDegree(String paper){
        return getABCByPaper(paper);
    }
}
