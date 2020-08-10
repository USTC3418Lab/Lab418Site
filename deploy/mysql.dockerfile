FROM mysql:5.7

# 应该与sql文件中的密码一致
ENV MYSQL_ROOT_PASSWORD=123456
ENV MYSQL_DATABASE=lab418
ENV TZ=Asia/Shanghai

# 会自动执行
COPY ./startup.sql /docker-entrypoint-initdb.d
# 没什么用，需要在run或者compose里面再配置
EXPOSE 3306
# charset
CMD [ "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci", "--default-time_zone=+8:00" ]