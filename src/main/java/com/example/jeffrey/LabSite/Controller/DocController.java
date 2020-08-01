package com.example.jeffrey.LabSite.Controller;

import com.example.jeffrey.LabSite.Entity.DocEntity;
import com.example.jeffrey.LabSite.Entity.Ope_result;
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
    private Ope_result ope_result;

    @RequestMapping("/doc?{title}")
    public DocEntity getdoc(@PathVariable("title") String title){
        return docMapper.getDocByTitle(title);
    }

    @RequestMapping("/doc")
    public List<DocEntity> getdocs(String title){
        List<DocEntity> list = docMapper.getDocs();
        return docMapper.getDocs();
    }
    @RequestMapping("/doc/delete?{title}")
    public Ope_result deleteDoc(String title){
        ope_result.setOperation("delete");
        if (docMapper.getDocByTitle(title)!=null) {
            docMapper.deleteDocByTitle(title);
            ope_result.setCode(200);
            ope_result.setMessage("delete success");
            return ope_result;
        }
        else{
            ope_result.setMessage("text not exists");
            ope_result.setCode(500);
            return ope_result;
        }
    }
}
