package com.example.jeffrey.LabSite.Controller;

import com.example.jeffrey.LabSite.Entity.DocEntity;
import com.example.jeffrey.LabSite.Entity.Ope_Result;
import com.example.jeffrey.LabSite.Mapper.DocMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.Date;
import java.util.List;

@RestController
public class DocController {

    @Autowired
    private DocMapper docMapper;
    @Autowired
    private RedisTemplate<Object,Object> redisTemplate;

    @RequestMapping("/doc?{title}")
    public DocEntity getdoc(@PathVariable("title") String title){
        DocEntity docEntity= (DocEntity) redisTemplate.opsForValue().get(title);
        if(docEntity == null){
            docEntity = docMapper.getDocByTitle(title);
            redisTemplate.opsForValue().set(title,docEntity);
        }
        return docEntity;
    }

    @RequestMapping("/doc")
    public List<DocEntity> getdocs(){
        List<DocEntity> list = (List<DocEntity>) redisTemplate.opsForValue().get("alldocs");
        if(null == list){
            list = docMapper.getDocs();
            redisTemplate.opsForValue().set("alldocs", list);
        }
        return list;
    }
    @RequestMapping("/doc/delete?{title}")
    public Ope_Result deleteDoc(String title){
        Ope_Result ope = new Ope_Result();
        if (docMapper.getDocByTitle(title)!=null) {
            docMapper.deleteDocByTitle(title);
            redisTemplate.delete(title);//缓存、数据库一致
            ope.setCode(200);
            ope.setMessage("delete success");
            return ope;
        }
        else{
            ope.setMessage("text not exists");
            ope.setCode(400);
            return ope;
        }
    }
    @PostMapping("/doc/add")
    public Ope_Result addDoc(@RequestParam("title") String title, @RequestParam("paragraph") String paragraph){
        Ope_Result ope = new Ope_Result();
        if(docMapper.getDocByTitle(title)!=null){
            ope.setCode(400);
            ope.setMessage("DOC_EXISTED");
            return ope;
        }else{
            long date = new Date().getTime();
            docMapper.insertIntoDoc(title,paragraph,date); //更新数据库
            DocEntity docEntity = docMapper.getDocByTitle(title);
            redisTemplate.opsForValue().set(title, docEntity); //更新缓存
            List<DocEntity> list = (List<DocEntity>)docMapper.getDocs();
            redisTemplate.opsForValue().set("alldocs",list);
            ope.setCode(200);
            ope.setMessage("SUCCESS");
            return ope;
        }
    }

    @PostMapping("/doc/update")
    public Ope_Result updateDoc(@RequestParam("title")String title,@RequestParam("paragraph")String paragraph){
        Ope_Result ope = new Ope_Result();
        if(docMapper.getDocByTitle(title) == null){
            ope.setCode(401);
            ope.setMessage("DOC_NOT_FOUND");
            return ope;
        }else{
            docMapper.deleteDocByTitle(title);
            long date = new Date().getTime();
            docMapper.insertIntoDoc(title,paragraph,date);
            DocEntity docEntity = docMapper.getDocByTitle(title);
            redisTemplate.opsForValue().set(title,docEntity);
            List<DocEntity> list = (List<DocEntity>)docMapper.getDocs();
            redisTemplate.opsForValue().set("alldocs",list);
            ope.setCode(200);
            ope.setMessage("SUCCESS");
            return ope;
        }
    }
}
