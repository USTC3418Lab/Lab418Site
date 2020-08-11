GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' identified BY '123456' WITH GRANT OPTION; 

CREATE TABLE IF NOT EXISTS doc(
   title varchar(40) NOT NULL,
   paragraph varchar(1000) NOT NULL,
   timestamp bigint(20),
   PRIMARY KEY ( title )
)CHARSET=utf8mb4;

-- INSERT INTO doc values('测试标题', '# 测试段落\n`print("ok")`\n哈哈哈哈，敬请忽略', 1597062005000);

SELECT * from doc;

-- delete from doc where title='测试标题';