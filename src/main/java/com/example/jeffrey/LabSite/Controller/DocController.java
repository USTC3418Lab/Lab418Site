package com.example.jeffrey.LabSite.Controller;

import com.example.jeffrey.LabSite.Entity.DocEntity;
import com.example.jeffrey.LabSite.Mapper.DocMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DocController {

    @Autowired
    private DocMapper docMapper;

    @RequestMapping("/doc/get")
    public String getdoc(String title){
        DocEntity docEntity = docMapper.getDocByTitle(title);
        return docEntity.toString();
    }

    @RequestMapping("/doc")
    public String getdocs(){
        List<DocEntity> list = docMapper.getDocs();
        return docMapper.getDocs().toString();
    }
}
