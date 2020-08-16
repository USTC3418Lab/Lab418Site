package com.example.jeffrey.LabSite.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import com.example.jeffrey.LabSite.Entity.ClipboardData;
import com.example.jeffrey.LabSite.Entity.OpeResult;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClipboardController {
    private final static int MAX_SIZE = 1000;
    private int currentId = 1;
    private LinkedHashMap<Integer, ClipboardData> clipboardDataMap2 = new LinkedHashMap<Integer, ClipboardData>() {
        private static final long serialVersionUID = 1L;

        @Override
        protected boolean removeEldestEntry(Map.Entry<Integer, ClipboardData> eldest) {
            if (this.size() > MAX_SIZE)
                return true;
            return false;
        }
    };

    @GetMapping("/clipboard")
    public ArrayList<ClipboardData> getClipboardTexts() {
        ArrayList<ClipboardData> res = new ArrayList<>();
        clipboardDataMap2.forEach((id, data) -> {
            res.add(data);
        });
        return res;
    }

    @GetMapping("/clipboard/delete")
    public OpeResult deleteClipboardText(@RequestParam int id) {
        OpeResult result;
        if (clipboardDataMap2.containsKey(id)) {
            clipboardDataMap2.remove(id);
            result = new OpeResult(200, "SUCCESS");
        } else {
            result = new OpeResult(400, "FAIL");
        }
        return result;
    }

    @PostMapping("/clipboard/add")
    public OpeResult addClipboardText(@RequestParam String text) {
        OpeResult result = new OpeResult(200, "SUCCESS");

        clipboardDataMap2.put(currentId, new ClipboardData(currentId, text, new Date().getTime()));
        currentId += 1;
        if (currentId < 0)
            currentId = 1;
        return result;
    }
}