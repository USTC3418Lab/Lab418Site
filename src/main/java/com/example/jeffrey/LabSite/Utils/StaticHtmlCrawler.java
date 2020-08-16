package com.example.jeffrey.LabSite.Utils;


import com.example.jeffrey.LabSite.Entity.ConferenceSearch.Paper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.example.jeffrey.LabSite.Utils.PdfOperation.*;

public class StaticHtmlCrawler {
    public static List<Paper> getConByPaper2(String paper){
        List<Paper> list = new ArrayList<>();
        String search_url = "https://dblp.uni-trier.de/search/publ/inc?q=";
        if(paper.contains(" ")){
            paper = paper.replaceAll(" ","%20");
        }
        String index_url = search_url+paper;
        System.out.println(index_url);
        try{
            Document document = Jsoup.connect(index_url).get();
            Elements elements = document.select("div#main").select("ul.publ-list").select("li");
            for (Element element :
                    elements) {
                Elements temp = element.select("cite.data");
                Elements title = temp.select("span.title");
                if(title.text().length()!=0){
                    System.out.println("title::"+title.text());
                    Elements cons = temp.select("a");
                    for (Element con :
                            cons) {
                        String href = con.attr("href");
                        if(href.contains("https://dblp.uni-trier.de/db/")){
                            href = href.replaceAll("https","http");
                            int index = href.lastIndexOf("/");
                            if(index == href.length()-1){
                                href = href;
                            }else{
                                href = href.substring(0,index+1);
                            }
                            Paper paper1 = new Paper(title.text(),href,con.text());
                            list.add(paper1);
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    public static List<Paper> getABCByPaper2(String paper){
        List<Paper> list = new ArrayList<>();
        List<Paper> list_papers = getConByPaper2(paper);
        System.out.println(list_papers);
        for (Paper pp :
                list_papers) {
            String href = pp.getHref();
//            System.out.println("href:"+href);
//            System.out.println(a_set);
//            System.out.println(b_set);
//            System.out.println(c_set);
            if(a_set.contains(href)){
                Paper p = new Paper(pp.getTitle(),pp.getHref(),pp.getConference(),"A类");
                list.add(p);
            }else if(b_set.contains(href)){
                Paper p = new Paper(pp.getTitle(),pp.getHref(),pp.getConference(),"B类");
                list.add(p);
            }else if (c_set.contains(href)){
                Paper p = new Paper(pp.getTitle(),pp.getHref(),pp.getConference(),"C类");
                list.add(p);
            }
        }
//        System.out.println(list);
        return list;
    }
}
