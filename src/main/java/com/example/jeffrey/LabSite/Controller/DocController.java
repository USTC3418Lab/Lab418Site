package com.example.jeffrey.LabSite.Controller;
import com.example.jeffrey.LabSite.Entity.Ope_Result;
import com.example.jeffrey.LabSite.Entity.DocEntity;
import com.example.jeffrey.LabSite.Mapper.DocMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
public class DocController {

    @Autowired
    private DocMapper docMapper;
    @Autowired
    private RedisTemplate<Object,Object> redisTemplate;
    @RequestMapping("/doc")
    public List<DocEntity> getdocs(String title)  {
        if(title == null){
            List<DocEntity> list = new ArrayList<DocEntity>();
            if(redisTemplate.opsForHash().size("alldocs") == 0){
                list = docMapper.getDocs();
                for(DocEntity item:list){
                    redisTemplate.opsForHash().put("alldocs",item.getTitle(),item);
                }
            }
            else{
                Map<Object,Object> map = redisTemplate.opsForHash().entries("alldocs");
                for(Object tit:map.keySet()){
                    DocEntity doc = (DocEntity) map.get(tit);
                    list.add(doc);
                }
            }
//            List<DocEntity> list = (List<DocEntity>)
            return list;
        }else{
            System.out.println("doc title get");
            List<DocEntity> list= (List<DocEntity>) redisTemplate.opsForHash().get("alldocs",title);
            if(list == null){
                list = docMapper.getDocByTitle(title);
                if(list.size()!=0) {
                    redisTemplate.opsForHash().put("alldocs",title,list.get(0));
                }
            }
            return list;
        }
    }
    @RequestMapping("/doc/delete")
    public Ope_Result deleteDoc(String title){
        Ope_Result ope = new Ope_Result();
        if (docMapper.getDocByTitle(title).size() !=0) {
            docMapper.deleteDocByTitle(title);
            if(redisTemplate.opsForHash().get("alldocs",title)!=null){
                redisTemplate.opsForHash().delete("alldocs",title);
            }
            ope.setCode(200);
            ope.setMessage("SUCCESS");
            return ope;
        }
        else{
            ope.setMessage("DOC_NOT_FOUND");
            ope.setCode(401);
            return ope;
        }
    }
    @PostMapping("/doc/add")
    public Ope_Result addDoc(@RequestParam("title") String title, @RequestParam("paragraph") String paragraph){
        Ope_Result ope = new Ope_Result();
        if(docMapper.getDocByTitle(title).size()!=0){
            ope.setCode(400);
            ope.setMessage("DOC_EXISTED");
            return ope;
        }else{
            long date = new Date().getTime();
            docMapper.insertIntoDoc(title,paragraph,date); //更新数据库
            DocEntity docEntity  = new DocEntity(title,paragraph,date);
            redisTemplate.opsForHash().put("alldocs",title,docEntity); //更新缓存
            ope.setCode(200);
            ope.setMessage("SUCCESS");
            return ope;
        }
    }

    @PostMapping("/doc/update")
    public Ope_Result updateDoc(@RequestParam("title")String title,@RequestParam("paragraph")String paragraph){
        Ope_Result ope = new Ope_Result();
        if(docMapper.getDocByTitle(title).size() == 0){
            ope.setCode(401);
            ope.setMessage("DOC_NOT_FOUND");
            return ope;
        }else{
            long date = new Date().getTime();
            docMapper.UpdateDoc(title,paragraph,date);
            DocEntity docEntity = docMapper.getDocByTitle(title).get(0);
            redisTemplate.opsForHash().put("alldocs",title,docEntity);
            ope.setCode(200);
            ope.setMessage("SUCCESS");
            return ope;
        }

    }
//    @RequestMapping("/test")
//    public void test() throws JsonProcessingException {
//        long a = 3234;
//        DocEntity doc = new DocEntity("1","2",a);
//        redisTemplate.opsForHash().put("alldocs","123234",doc);
//        Map<Object, Object> map = redisTemplate.opsForHash().entries("alldocs");
//        for(Object tit:map.keySet()){
////            list.add((DocEntity)map.get(tit));
//            ObjectMapper objectMapper = new ObjectMapper();
//            String jsonInfo = objectMapper.writeValueAsString(map.get(tit));
//            System.out.println(jsonInfo);
//            DocEntity doc_entity = objectMapper.readValue(jsonInfo,DocEntity.class);
//            System.out.println(tit);
//            System.out.println(doc_entity);
//        }
//    }
}
