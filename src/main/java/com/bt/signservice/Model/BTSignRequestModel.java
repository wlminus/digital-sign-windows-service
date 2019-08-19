package com.bt.signservice.Model;

import java.util.List;
import java.util.Map;

public class BTSignRequestModel {
    private List<AttachmentModel> dataAttachment;

    private String token;

    private String serverUploadEndpoint;
    private String selectedCertAlias;

    private String name;
    private String location;
    private String reason;

    public List<AttachmentModel> getDataAttachment() {
        return dataAttachment;
    }

    public void setDataAttachment(List<AttachmentModel> dataAttachment) {
        this.dataAttachment = dataAttachment;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getServerUploadEndpoint() {
        return serverUploadEndpoint;
    }

    public void setServerUploadEndpoint(String serverUploadEndpoint) {
        this.serverUploadEndpoint = serverUploadEndpoint;
    }

    public String getSelectedCertAlias() {
        return selectedCertAlias;
    }

    public void setSelectedCertAlias(String selectedCertAlias) {
        this.selectedCertAlias = selectedCertAlias;
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


}
