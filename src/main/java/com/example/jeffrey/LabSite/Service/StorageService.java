package com.example.jeffrey.LabSite.Service;

import com.example.jeffrey.LabSite.Entity.Dir;
import com.example.jeffrey.LabSite.Entity.OpeResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@Service
@Component
public class StorageService {
    @Value("${config.basePath}")
    private String basepath;

    public OpeResult uploadFile(MultipartFile file, String relative_path) {
        OpeResult opeResult = new OpeResult();
        try {
            Path location = Paths.get(basepath + File.separator + relative_path + File.separator
                    + StringUtils.cleanPath(file.getOriginalFilename()));
            Files.copy(file.getInputStream(), location, StandardCopyOption.REPLACE_EXISTING);
            opeResult.setCode(200);
            opeResult.setMessage("SUCCESS");
        } catch (Exception e) {
            opeResult.setCode(500);
            opeResult.setMessage("CANT STORE");
        }
        return opeResult;
    }

    public OpeResult deleteFile(String filepath) {
        OpeResult opeResult = new OpeResult();
        Path location = Paths.get(basepath + File.separator + filepath);
        System.out.println(location);
        try {
            Files.delete(location);
            opeResult.setCode(200);
            opeResult.setMessage("SUCCESS");
        } catch (IOException e) {
            opeResult.setCode(500);
            opeResult.setMessage("File not exists");
        }
        return opeResult;
    }

    public OpeResult newDir(String filepath) {
        OpeResult opeResult = new OpeResult();
        Path location;
        location = Paths.get(basepath + File.separator + filepath);
        if (Files.isDirectory(location)) {
            opeResult.setCode(500);
            opeResult.setMessage("Folder Already Exists");
            return opeResult;
        }
        try {
            Files.createDirectory(location);
            opeResult.setCode(200);
            opeResult.setMessage("SUCCESS");
        } catch (IOException e) {
            opeResult.setCode(500);
            opeResult.setMessage("Folder Create Failed");
        }
        return opeResult;
    }

    public FileSystemResource loadFileAsResource(String fileName) {
        FileSystemResource fileSystemResource;
        Path filePath = Paths.get(basepath + File.separator + fileName);
        fileSystemResource = new FileSystemResource(filePath);
        System.out.println(fileSystemResource);
        System.out.println(Files.exists(Paths.get(fileSystemResource.getPath())));
        return fileSystemResource;
    }

    public List<Dir> getContent() {
        return getContentRecursively(basepath, "0");
    }

    private List<Dir> getContentRecursively(String path, String baseKey) {
        final String subMakr = "-";
        List<Dir> dir = new ArrayList<>();
        File file = new File(path);
        File[] fs = file.listFiles();
        if (fs != null) {
            Arrays.sort(fs, new Comparator<File>() {
                @Override
                public int compare(File a, File b) {
                    if ((a.isDirectory() && b.isDirectory()) || (!a.isDirectory() && !b.isDirectory()))
                        return a.getName().compareTo(b.getName());
                    return a.isDirectory() ? -1 : 1;
                }
            });
            int i = 0;
            for (File f : fs) {
                Dir tmpDir = new Dir();
                final String tmpKey = baseKey + subMakr + String.valueOf(i);
                tmpDir.setKey(tmpKey);
                if (f.isDirectory()) {
                    tmpDir.setChildren(getContentRecursively(f.getPath(), tmpKey));
                    tmpDir.setTitle(f.getName());
                    tmpDir.setIsLeaf(false);
                } else {
                    tmpDir.setChildren(null);
                    tmpDir.setIsLeaf(true);
                    tmpDir.setTitle(f.getName());
                }
                dir.add(tmpDir);
                ++i;
            }
        }
        return dir;
    }
}
