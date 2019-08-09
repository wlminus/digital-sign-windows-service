package com.bt.signservice;

import com.bt.signservice.Model.Constant;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class SignserviceApplication {

    public static void main(String[] args) {
        File theDir = new File(Constant.ROOT_UPLOAD_PATH);
        if (!theDir.exists()) {
            theDir.mkdir();
        }
        SpringApplication.run(SignserviceApplication.class, args);
    }

}
