FROM openjdk:12.0.1-jdk-oracle
COPY lab418.war /lab418site/
WORKDIR /lab418site/
CMD [ "java", "-jar", "lab418.war" ]
