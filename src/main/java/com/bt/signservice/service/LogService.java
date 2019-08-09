package com.bt.signservice.service;

import com.bt.signservice.Model.Constant;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class LogService {
    public LogService() throws IOException {
        File logFile = new File(Constant.LOG_FILE_PATH);
        logFile.createNewFile();
    }
    public void WriteLogToFile(String log) throws IOException {
        Files.write(Paths.get(Constant.LOG_FILE_NAME), log.getBytes(), StandardOpenOption.APPEND);
    }
}
