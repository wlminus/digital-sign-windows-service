package com.bt.signservice.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public class SignRequestModel {
//    private CertModel selectedCert;
    private String selectedCertAlias;

    private String inputFile;
    private String fileName;
    private String ext;

    @JsonProperty
    private boolean isUpload;
    private String serverUploadEndpoint;

    private String cookieStr;
    private Map<String, String> token;

    private String name;
    private String location;
    private String reason;

//    public CertModel getSelectedCert() {
//        return selectedCert;
//    }
//
//    public void setSelectedCert(CertModel selectedCert) {
//        this.selectedCert = selectedCert;
//    }

    public String getSelectedCertAlias() {
        return selectedCertAlias;
    }

    public void setSelectedCertAlias(String selectedCertAlias) {
        this.selectedCertAlias = selectedCertAlias;
    }

    public String getInputFile() {
        return inputFile;
    }

    public void setInputFile(String inputFile) {
        this.inputFile = inputFile;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    public String getServerUploadEndpoint() {
        return serverUploadEndpoint;
    }

    public void setServerUploadEndpoint(String serverUploadEndpoint) {
        this.serverUploadEndpoint = serverUploadEndpoint;
    }

    public String getCookieStr() {
        return cookieStr;
    }

    public void setCookieStr(String cookieStr) {
        this.cookieStr = cookieStr;
    }

    public Map<String, String> getToken() {
        return token;
    }

    public void setToken(Map<String, String> token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public boolean isUpload() {
        return isUpload;
    }

    public void setUpload(boolean upload) {
        isUpload = upload;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public SignRequestModel() {
    }

    public SignRequestModel(String selectedCertAlias, String inputFile, String fileName, String ext, boolean isUpload, String serverUploadEndpoint, String cookieStr, Map<String, String> token, String name, String location, String reason) {
//        this.selectedCert = selectedCert;
        this.selectedCertAlias = selectedCertAlias;
        this.inputFile = inputFile;
        this.fileName = fileName;
        this.ext = ext;
        this.isUpload = isUpload;
        this.serverUploadEndpoint = serverUploadEndpoint;
        this.cookieStr = cookieStr;
        this.token = token;
        this.name = name;
        this.location = location;
        this.reason = reason;
    }

    @Override
    public String toString() {
        return "SignRequestModel{" +
//                "selectedCert=" + selectedCert +
                ", selectedCertAlias='" + selectedCertAlias + '\'' +
                ", inputFile=" + inputFile +
                ", fileName='" + fileName + '\'' +
                ", ext='" + ext + '\'' +
                ", isUpload=" + isUpload +
                ", serverUploadEndpoint='" + serverUploadEndpoint + '\'' +
                ", cookieStr='" + cookieStr + '\'' +
                ", token=" + token +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", reason='" + reason + '\'' +
                '}';
    }
}
