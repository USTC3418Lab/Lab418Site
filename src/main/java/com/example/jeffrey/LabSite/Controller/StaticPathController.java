package com.example.jeffrey.LabSite.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StaticPathController {
    @GetMapping(value = { "/", "/index" })
    public String indexPath() {
        return "index";
    }

    @GetMapping(value = { "/page", "/page/*" })
    public String allPath() {
        return "index";
    }
}