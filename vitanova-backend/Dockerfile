## Runtime-only image; jar is built by CI and copied from target/
#FROM public.ecr.aws/amazoncorretto/amazoncorretto:17
#
## Consistent workdir
#WORKDIR /app
#
## Sensible JVM defaults in containers
#ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75"
## App Runner will route to this port
#ENV SERVER_PORT=8080
#EXPOSE 8080
#
## Copy the fat jar produced by `mvn package`
#ARG JAR_FILE=target/vitanova-backend-0.0.1-SNAPSHOT.jar
#COPY ${JAR_FILE} /app/app.jar
#
## Start Spring Boot
#ENTRYPOINT ["java","-jar","/app/app.jar"]


# ---- build stage ----
FROM public.ecr.aws/amazoncorretto/amazoncorretto:17 AS build
WORKDIR /src
# cache deps
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN sed -i 's/\r$//' mvnw || true && chmod +x mvnw
RUN ./mvnw -B -q -U -DskipTests dependency:go-offline
# build
COPY src ./src
RUN ./mvnw -B -q -DskipTests package

# ---- runtime stage ----
FROM public.ecr.aws/amazoncorretto/amazoncorretto:17
WORKDIR /app
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75"
EXPOSE 8080
# copy the fat jar produced in the build stage
COPY --from=build /src/target/*-SNAPSHOT.jar /app/app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
