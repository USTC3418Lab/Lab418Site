#!/bin/bash

# todo 备份和回复MySQL中存储的文件，可以使用挂载方式
echo '此操作会删除所有已部署的容器，包括mysql和redis，确定继续？(ctrl+c退出)'
read a

echo '请确保在deploy/文件夹中执行次脚本，继续？(ctrl+c退出)'
read b

# 可能会失败，但忽略
echo '执行docker-compose down，停止并删除已创建容器'
# sudo docker container stop lab418-site
# sudo docker container stop lab418-mysql
# sudo docker container stop lab418-redis
# sudo docker container rm lab418-site
# sudo docker container rm lab418-mysql
# sudo docker container rm lab418-redis
# sudo docker image rm lab418-mysql-img:latest
sudo docker-compose down

echo '容器与镜像已删除，开始部署?(ctrl+c结束)'
read c

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

echo '清理后端打包文件'
./mvnw clean -f ./pom.xml

echo '开始打包后端'
./mvnw package -f ./pom.xml

echo '拷贝打包后的文件'
rm deploy/lab418.war
cp -f target/LabSite-0.0.1-SNAPSHOT.war deploy/lab418.war

echo '进入deploy/'
cd deploy/                   # /deploy

# echo '创建mysql镜像'
# sudo docker build -t lab418-mysql-img:latest -f mysql.dockerfile ./

echo '开始执行docker-compose，后台模式'
sudo docker-compose up -d --build
