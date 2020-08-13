package com.example.jeffrey.LabSite.Utils;


import com.example.jeffrey.LabSite.Entity.ConferenceSearch.Paper;
import com.example.jeffrey.LabSite.Entity.ConferenceSearch.ReponsePaper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.example.jeffrey.LabSite.Utils.PdfOperation.*;

public class StaticHtmlCrawler {
    public static List<Paper> getConByPaper(String paper){
        List<Paper> list = new ArrayList<Paper>();
        String dblp_url = "https://dblp.uni-trier.de/search?q=";
        if(paper.contains(" ")){
            paper = paper.replaceAll(" ","%20");
        }
        String index_url = dblp_url + paper;
        System.out.println(index_url);
        try {
            Document document= Jsoup.connect(index_url).get();
            Elements elements = document.select("div.body.hide-body");
            Elements element_1 = elements.select("ul.publ-list");
            Elements elements1 = element_1.select("li");
            for (Element element :
                    elements1) {
                Elements temp = element.select("cite.data");
                Elements title = temp.select("span.title");
                if(title.text().length()!=0){
                    System.out.println("title"+title.text());
                    Elements cons = temp.select("a");
                    for (Element con :
                            cons) {
                        String href = con.attr("href");
                        if(href.contains("https://dblp.uni-trier.de/db/")){
                            System.out.println(href);
                            String con_name=""; //记录会议名
                            Document document1 = Jsoup.connect(href).get();
                            Elements elements_href = document1.select("div#breadcrumbs.section");
                            Elements elements_span = elements_href.select("span");
                            int len = elements_span.size();
                            Element element1_href = elements_span.get(len-1);
                            System.out.println(element1_href.text());
                            Paper paper1 = new Paper(title.text(),element1_href.text());
                            list.add(paper1);
                        }
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }
    public static List<String> getABCByPaper(String paper){
        List<String> list = new ArrayList<>();
        List<Paper> list_papers = getConByPaper(paper);
        for (Paper pp :
                list_papers) {
            String con = pp.getCon();
            for (String a :
                    a_deg) {
                if (a.equals(con)){
                    list.add("A类");
                }
            }
            for (String b :
                    b_deg) {
                if (b.equals(con)){
                    list.add("B类");
                }
            }
            for (String c :
                    c_deg) {
                if (c.equals(con)){
                    list.add("C类");
                }
            }
        }
        System.out.println(list);
        return list;
    }
}
