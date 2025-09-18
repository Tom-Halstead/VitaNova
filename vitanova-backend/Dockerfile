# ---------- Build stage ----------
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
# Build a Spring Boot fat jar
RUN mvn -q -DskipTests package

# ---------- Runtime stage ----------
FROM eclipse-temurin:17-jre
WORKDIR /app
# copy the repackaged boot jar (adjust glob if your jar name differs)
COPY --from=build /workspace/target/*SNAPSHOT.jar /app/app.jar

# App Runner routes to this port
ENV SERVER_PORT=8080
EXPOSE 8080

# Good container JVM defaults
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75"

ENTRYPOINT ["java","-jar","/app/app.jar"]
