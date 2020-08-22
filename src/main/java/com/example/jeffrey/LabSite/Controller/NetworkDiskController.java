package com.example.jeffrey.LabSite.Controller;

import com.example.jeffrey.LabSite.Entity.Dir;
import com.example.jeffrey.LabSite.Entity.OpeResult;
import com.example.jeffrey.LabSite.Service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
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
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
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
    @PostMapping("/cloud-dick/delete")
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
    @PostMapping("/cloud-disk/removedir")
    @ResponseBody
    public OpeResult deleteDirectory(@RequestParam("dirpath")String dirpath){
        OpeResult opeResult;
        opeResult = storageService.deleteDir(dirpath);
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
        headers.add("Content-Disposition","attachment;filename="+filename);
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.contentLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new InputStreamResource(file.getInputStream()));
    }
    @GetMapping("/cloud-disk")
    @ResponseBody
    public List<Dir> getContent(){
        List<Dir> dirs = new ArrayList<>();
        dirs = storageService.getContent();
        return dirs;
    }

}
