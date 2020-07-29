package com.example.jeffrey.LabSite.Mapper;

import com.example.jeffrey.LabSite.Entity.DocEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DocMapper {
    @Select("select * from doc where title = #{title}")
    DocEntity getDocByTitle(@Param("title")String title);

    @Select("select * from doc")
    List<DocEntity> getDocs();
}
