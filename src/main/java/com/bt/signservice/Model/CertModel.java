package com.bt.signservice.Model;

import javax.security.auth.x500.X500Principal;
import java.util.Date;

public class CertModel {
    private long id;
    private boolean valid;
    private String alias;
    private X500Principal issuer;
    private String subject;
    private String algName;
    private String algOID;
    private int version;
    private Date notAfter;

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public X500Principal getIssuer() {
        return issuer;
    }

    public void setIssuer(X500Principal issuer) {
        this.issuer = issuer;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getAlgName() {
        return algName;
    }

    public void setAlgName(String algName) {
        this.algName = algName;
    }

    public String getAlgOID() {
        return algOID;
    }

    public void setAlgOID(String algOID) {
        this.algOID = algOID;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public Date getNotAfter() {
        return notAfter;
    }

    public void setNotAfter(Date notAfter) {
        this.notAfter = notAfter;
    }

    public CertModel() {
    }

    public CertModel(long id, boolean valid, String alias, X500Principal issuer, String subject, String algName, String algOID, int version, Date notAfter) {
        this.id = id;
        this.valid = valid;
        this.alias = alias;
        this.issuer = issuer;
        this.subject = subject;
        this.algName = algName;
        this.algOID = algOID;
        this.version = version;
        this.notAfter = notAfter;
    }

    @Override
    public String toString() {
        return "CertModel{" +
                "id=" + id +
                ", valid=" + valid +
                ", alias='" + alias + '\'' +
                ", issuer=" + issuer +
                ", subject=" + subject +
                ", algName='" + algName + '\'' +
                ", algOID='" + algOID + '\'' +
                ", version=" + version +
                ", notAfter=" + notAfter +
                '}';
    }
}
