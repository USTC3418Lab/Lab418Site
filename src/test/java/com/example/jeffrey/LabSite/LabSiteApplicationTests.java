package com.example.jeffrey.LabSite;

import org.jasypt.encryption.StringEncryptor;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
class LabSiteApplicationTests {
	@Autowired
	private StringEncryptor stringEncryptor;

	@Test
	public void testProperties(){
		System.out.println(stringEncryptor.encrypt("123456"));
	}

}
