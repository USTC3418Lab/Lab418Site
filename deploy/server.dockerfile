FROM openjdk:12.0.1-jdk-oracle
COPY lab418.war /lab418site/
COPY shadow /lab418site/real_shadow
CMD [ "java", "-jar", "/lab418site/lab418.war" ]
