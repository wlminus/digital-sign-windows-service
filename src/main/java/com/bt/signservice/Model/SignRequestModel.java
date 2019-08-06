package com.bt.signservice.Model;

import java.util.List;

public class SignRequestModel {
    private long idCertUserChoose;

    private String pathToFile;

    private String ext;

    private String serverUploadEndpoint;

    private String cookieStr;

    private String token;

    private String name;
    private String location;
    private String reason;

    public long getIdCertUserChoose() {
        return idCertUserChoose;
    }

    public void setIdCertUserChoose(long idCertUserChoose) {
        this.idCertUserChoose = idCertUserChoose;
    }

    public String getPathToFile() {
        return pathToFile;
    }

    public void setPathToFile(String pathToFile) {
        this.pathToFile = pathToFile;
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
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

    public SignRequestModel(long idCertUserChoose, String pathToFile, String ext, String serverUploadEndpoint, String cookieStr, String token, String name, String location, String reason) {
        this.idCertUserChoose = idCertUserChoose;
        this.pathToFile = pathToFile;
        this.ext = ext;
        this.serverUploadEndpoint = serverUploadEndpoint;
        this.cookieStr = cookieStr;
        this.token = token;
        this.name = name;
        this.location = location;
        this.reason = reason;
    }
}
