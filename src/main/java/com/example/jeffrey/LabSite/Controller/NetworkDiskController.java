package com.example.jeffrey.LabSite.Controller;

import com.example.jeffrey.LabSite.Entity.Dir;
import com.example.jeffrey.LabSite.Entity.OpeResult;
import com.example.jeffrey.LabSite.Service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
public class NetworkDiskController {

    @Autowired
    StorageService storageService;

    @PostMapping("/cloud-disk/upload")
    @ResponseBody
    public OpeResult uploadFile(@RequestParam("file")MultipartFile file,@RequestParam("dir")String dir){
        OpeResult opeResult;
        opeResult = storageService.uploadFile(file,dir);
        return opeResult;
    }
    @PostMapping("/cloud-disk/delete")
    @ResponseBody
    public OpeResult deleteFile(@RequestParam("filepath")String filepath){
        OpeResult opeResult;
        opeResult = storageService.deleteFile(filepath);
        return opeResult;
    }
    @PostMapping("/cloud-disk/mkdir")
    @ResponseBody
    public OpeResult makeDirectory(@RequestParam("filepath")String filepath){
        OpeResult opeResult;
        opeResult = storageService.newDir(filepath);
        return opeResult;
    }
    @GetMapping("/cloud-disk/download")
    public ResponseEntity downloadFile(@RequestParam("filepath") String filepath) throws IOException {
        FileSystemResource file = storageService.loadFileAsResource(filepath);
        String filename = "default.txt";
        if(!filepath.contains("/")){
            filename = filepath;
        }else {
            int index = filepath.lastIndexOf("/");
            filename = filepath.substring(index+1,filepath.length());
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition","attachment;filename="+new String(filename.getBytes("UTF-8"),"iso-8859-1"));
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.contentLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new InputStreamResource(file.getInputStream()));
    }
    @GetMapping("/cloud-disk")
    @ResponseBody
    public List<Dir> getContent(){
        return storageService.getContent();
    }

}
