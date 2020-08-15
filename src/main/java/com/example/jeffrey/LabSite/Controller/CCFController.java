package com.example.jeffrey.LabSite.Controller;

import com.example.jeffrey.LabSite.Entity.ConferenceSearch.Paper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.example.jeffrey.LabSite.Utils.StaticHtmlCrawler.getABCByPaper;

@RestController
public class CCFController {
    @RequestMapping("/ccf")
    public List<Paper> getDegree(String paper){
        return getABCByPaper(paper);
    }
}
