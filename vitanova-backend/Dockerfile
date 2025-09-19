# Runtime-only image; jar is built by CI and copied from target/
FROM public.ecr.aws/amazoncorretto/amazoncorretto:17

# Avoid surprises: set a consistent workdir
WORKDIR /app

# (Optional but good) JVM tuned for containers
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75"

# Spring will listen here in App Runner
ENV SERVER_PORT=8080
EXPOSE 8080

# Copy the fat jar produced by `mvn package` in CI
# If your jar name differs, set JAR_FILE arg from CI or change the path below.
ARG JAR_FILE=target/vitanova-backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /app/app.jar

# Start
ENTRYPOINT ["java","-jar","/app/app.jar"]
