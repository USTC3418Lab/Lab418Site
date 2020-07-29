package com.example.jeffrey.LabSite.Controller;

import com.example.jeffrey.LabSite.Entity.DocEntity;
import com.example.jeffrey.LabSite.Mapper.DocMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DocController {

    @Autowired
    private DocMapper docMapper;

    @RequestMapping("/doc?{title}")
    public DocEntity getdoc(@PathVariable("title") String title){
        return docMapper.getDocByTitle(title);
    }

    @RequestMapping("/doc")
    public List<DocEntity> getdocs(String title){
        return docMapper.getDocs();
    }
}
