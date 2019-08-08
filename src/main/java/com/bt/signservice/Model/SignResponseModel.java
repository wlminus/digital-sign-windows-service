package com.bt.signservice.Model;

public class SignResponseModel {
    private int statusCode;
    private String status;
    private String fileName;
    private String linkToFile;

    public SignResponseModel() {
    }

    public SignResponseModel(int statusCode, String status, String fileName, String linkToFile) {
        this.statusCode = statusCode;
        this.status = status;
        this.fileName = fileName;
        this.linkToFile = linkToFile;
    }

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

    public String getLinkToFile() {
        return linkToFile;
    }

    public void setLinkToFile(String linkToFile) {
        this.linkToFile = linkToFile;
    }

    @Override
    public String toString() {
        return "SignResponseModel{" +
                "statusCode=" + statusCode +
                ", status='" + status + '\'' +
                ", fileName='" + fileName + '\'' +
                ", linkToFile='" + linkToFile + '\'' +
                '}';
    }
}
