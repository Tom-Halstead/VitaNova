# Runtime-only image; jar is built by CI and copied from target/
FROM public.ecr.aws/amazoncorretto/amazoncorretto:17

# Consistent workdir
WORKDIR /app

# Sensible JVM defaults in containers
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75"
# App Runner will route to this port
ENV SERVER_PORT=8080
EXPOSE 8080

# Copy the fat jar produced by `mvn package`
ARG JAR_FILE=target/vitanova-backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /app/app.jar

# Start Spring Boot
ENTRYPOINT ["java","-jar","/app/app.jar"]
