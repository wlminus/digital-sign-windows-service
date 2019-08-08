package com.bt.signservice.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class LogService {
    private final String logFileName = "log.txt";
    private final String rootPath = System.getProperty("user.dir");
    public LogService() throws IOException {
        File logFile = new File(rootPath, logFileName);
        logFile.createNewFile();
    }
    public void WriteLogToFile(String log) throws IOException {
        Files.write(Paths.get(logFileName), log.getBytes(), StandardOpenOption.APPEND);
    }
}
