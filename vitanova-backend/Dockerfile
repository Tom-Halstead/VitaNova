# 1. Base Corretto 17 from AWS public ECR
FROM public.ecr.aws/amazoncorretto/amazoncorretto:17

# 2. Work directory inside container
WORKDIR /app

# 3. Copy your Spring Boot fat-JAR
COPY target/*.jar app.jar

# 4. Default startup command
ENTRYPOINT ["java","-jar","app.jar"]
