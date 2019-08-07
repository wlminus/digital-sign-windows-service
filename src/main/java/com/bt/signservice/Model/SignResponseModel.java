package com.bt.signservice.Model;

public class SignResponseModel {
    private int statusCode;
    private String status;
    private String fileName;

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public SignResponseModel(int statusCode, String status, String fileName) {
        this.statusCode = statusCode;
        this.status = status;
        this.fileName = fileName;
    }

    public SignResponseModel() {
    }
}
