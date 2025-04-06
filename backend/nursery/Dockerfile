# ------------ Stage 1: Build the JAR ------------
FROM maven:3.9.4-eclipse-temurin-17 AS builder

WORKDIR /build

# Copy pom.xml and download dependencies first for caching
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the project and build it
COPY . .
RUN mvn clean package -DskipTests

# ------------ Stage 2: Production image using distroless ------------
FROM gcr.io/distroless/java17

WORKDIR /app

COPY --from=builder /build/target/*.jar app.jar

CMD ["app.jar"]
