package com.example.jeffrey.LabSite.Controller;

import org.apache.commons.codec.digest.Sha2Crypt;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VerifyController {
    public static class Res {
        boolean ok;

        Res() {
            this.ok = false;
        }

        Res(boolean ok) {
            this.ok = ok;
        }

        public void setOk(boolean ok) {
            this.ok = ok;
        }

        public boolean isOk() {
            return ok;
        }
    }

    @GetMapping(path = "verify-user")
    public Res verifyUser(@RequestParam String username, @RequestParam String password) throws IOException {
        Res res = new Res(false);
        BufferedReader reader = new BufferedReader(new FileReader("/lab418site/real_shadow"));
        while (true) {
            String line = reader.readLine();
            if (line == null)
                break;
            if (line.startsWith(username + ":")) {
                String tmp = line.split(":")[1];
                res.ok = tmp
                        .equals(Sha2Crypt.sha512Crypt(password.getBytes(), tmp.substring(0, tmp.lastIndexOf("$") + 1)));
            }
        }
        reader.close();
        return res;
    }
}