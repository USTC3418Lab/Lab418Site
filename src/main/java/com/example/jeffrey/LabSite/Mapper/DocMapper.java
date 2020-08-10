package com.example.jeffrey.LabSite.Mapper;

import com.example.jeffrey.LabSite.Entity.DocEntity;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DocMapper {
    @Select("select * from doc where title = #{title}")
    List<DocEntity> getDocByTitle(@Param("title")String title);

    @Select("select * from doc")
    List<DocEntity> getDocs();

    @Delete("delete from doc where title = #{title}")
    void deleteDocByTitle(@Param("title")String title);

    @Insert("insert into doc values(#{title},#{paragraph},#{timestamp})")
    void insertIntoDoc(@Param("title") String title, @Param("paragraph") String paragraph, @Param("timestamp") long timestamp);

    @Update("update doc SET paragraph=#{paragraph},timestamp=#{timestamp} where title=#{title}")
    void UpdateDoc(@Param("title") String title,@Param("paragraph") String paragraph,@Param("timestamp") long timestamp);
}
