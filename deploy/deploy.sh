#!/bin/bash

# 可能会失败，但忽略
echo '停止并删除已创建容器'
sudo docker container stop lab418-site
sudo docker container stop lab418-mysql
sudo docker container stop lab418-redis
sudo docker container rm lab418-site
sudo docker container rm lab418-mysql
sudo docker container rm lab418-redis
sudo docker image rm lab418-mysql-img

echo '容器与镜像已删除，继续?(ctrl+c结束)'
read a

set -e
set -u

echo '正在进入frontend/'
cd ../frontend/                 # frontend/

echo '开始执行npm run build'
npm run build
echo '拷贝前端包到**/static/'
cp -rf build/* ../src/main/resources/static/

echo '退出frontend/'            # /
cd ../ 

echo '开始打包后端'
./mvnw package -f ./pom.xml

echo '拷贝打包后的文件'
cp target/LabSite-0.0.1-SNAPSHOT.war deploy/lab418.war

echo '进入deploy/'
cd deploy/                   # /deploy

echo '创建mysql镜像'
sudo docker build -t lab418-mysql-img:latest -f mysql.dockerfile ./

echo '开始执行docker-compose'
sudo docker-compose up
