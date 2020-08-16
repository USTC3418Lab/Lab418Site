package com.example.jeffrey.LabSite;

import com.example.jeffrey.LabSite.Utils.PdfOperation;
import org.jasypt.encryption.StringEncryptor;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static com.example.jeffrey.LabSite.Utils.PdfOperation.readPDFText;
import static com.example.jeffrey.LabSite.Utils.StaticHtmlCrawler.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class LabSiteApplicationTests {
//	@Autowired
//	private StringEncryptor stringEncryptor;
//
//	@Test
//	public void testProperties(){
//		System.out.println(stringEncryptor.encrypt("123456"));
//	}
//
//	@Test
//    public void TestPdfFunc(){
//        String a= readPDFText("src/CCF/中国计算机学会推荐国际学术会议和期刊目录-2019.pdf");//在CCF更新推荐会议和期刊时将此文件进行替代
//		PdfOperation operation= new PdfOperation();
//		operation.splitStringByLine(a);
//	}
//	@Test
//	public void testCrawler(){
//		System.out.println(getConByPaper2("Vetting USB Device Firmware using Domain Informed Symbolic Execution"));
//	}
//
	@Test
	public void TestGetCon(){
		System.out.println(getConByPaper2("Vetting USB Device Firmware using Domain Informed Symbolic Execution"));
	}

//	@Test
//	public void cutString(){
//		System.out.println(cutStringByChar("https://dblp.uni-trier.de/db/conf/ccs/ccs2017.html#KolesnikovNRTT17",'/'));
//	}
}
