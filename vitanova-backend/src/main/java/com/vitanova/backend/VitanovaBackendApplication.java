package com.vitanova.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.vitanova.backend")
@EntityScan(basePackages = "com.vitanova.backend")
public class VitanovaBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(VitanovaBackendApplication.class, args);
	}

}
