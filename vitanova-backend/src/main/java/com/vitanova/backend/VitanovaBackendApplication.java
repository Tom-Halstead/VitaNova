package com.vitanova.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class VitanovaBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(VitanovaBackendApplication.class, args);
	}

}
