#!/bin/bash

echo '姝ゆ搷浣滀細鍒犻櫎鎵�鏈夊凡閮ㄧ讲鐨勫鍣紝鍖呮嫭mysql鍜宺edis锛岀‘瀹氱户缁�?(ctrl+c閫�鍑�)'
read a

echo '璇风‘淇濆湪deploy/鏂囦欢澶逛腑鎵ц娆¤剼鏈紝缁х画锛�(ctrl+c閫�鍑�)'
read b

# 鍙兘浼氬け璐ワ紝浣嗗拷鐣�
echo '鎵цdocker-compose down锛屽仠姝㈠苟鍒犻櫎宸插垱寤哄鍣�'
# sudo docker container stop lab418-site
# sudo docker container stop lab418-mysql
# sudo docker container stop lab418-redis
# sudo docker container rm lab418-site
# sudo docker container rm lab418-mysql
# sudo docker container rm lab418-redis
# sudo docker image rm lab418-mysql-img:latest
sudo docker-compose down

echo '瀹瑰櫒涓庨暅鍍忓凡鍒犻櫎锛屽紑濮嬮儴缃�?(ctrl+c缁撴潫)'
read c

set -e
set -u

echo '鍒涘缓MySQL鐩綍'
mkdir -p /lab418/mysql/data

echo '杩涘叆椤圭洰鏍圭洰褰�'
cd ../ # /

# echo '鎵撳寘鍓嶇?(y缁х画, ctrl+c閫�鍑�)'
# read d
# if [ $d == 'y' ]; then
echo '杩涘叆frontend/'
cd frontend/ # frontend/

echo '寮�濮嬫墽琛宯pm run build'
npm run build
echo '鎷疯礉鍓嶇鍖呭埌**/static/'
cp -rf build/* ../src/main/resources/static/

echo '閫�鍑篺rontend/' # /
cd ../
# fi

# echo '鎵撳寘鍚庣?(y缁х画, ctrl+c閫�鍑�)'
# read e
# if [ $e == 'y' ]; then
echo '娓呯悊鍚庣鎵撳寘鏂囦欢'
./mvnw clean -f ./pom.xml

echo '寮�濮嬫墦鍖呭悗绔�'
./mvnw package -f ./pom.xml
# fi

echo '鎷疯礉鎵撳寘鍚庣殑鏂囦欢'
rm -f deploy/lab418.war
cp -f target/LabSite-0.0.1-SNAPSHOT.war deploy/lab418.war

echo '杩涘叆deploy/'
cd deploy/ # /deploy

# echo '鍒涘缓mysql闀滃儚'
# sudo docker build -t lab418-mysql-img:latest -f mysql.dockerfile ./

echo '寮�濮嬫墽琛宒ocker-compose锛屽悗鍙版ā寮�'
sudo docker-compose up -d --build
