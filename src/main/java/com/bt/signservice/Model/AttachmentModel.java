package com.bt.signservice.Model;

import java.util.Arrays;
import java.util.Date;

public class AttachmentModel {
    private long id;
    private long tdphieuid;
    private String filename;
    private byte[] data;
    private Date ngaytao;
    private String nguoitao;
    private Date ngaysua;
    private String nguoisua;
    private Short loaiphieu;
    private Long stt;
    private String filepath;
    private String mieuta;
    private String realfilename;
    private Boolean banchinh;

    public AttachmentModel() {
    }

    public AttachmentModel(long id, long tdphieuid, String filename, byte[] data, Date ngaytao, String nguoitao, Date ngaysua, String nguoisua, Short loaiphieu, Long stt, String filepath, String mieuta, String realfilename, Boolean banchinh) {
        this.id = id;
        this.tdphieuid = tdphieuid;
        this.filename = filename;
        this.data = data;
        this.ngaytao = ngaytao;
        this.nguoitao = nguoitao;
        this.ngaysua = ngaysua;
        this.nguoisua = nguoisua;
        this.loaiphieu = loaiphieu;
        this.stt = stt;
        this.filepath = filepath;
        this.mieuta = mieuta;
        this.realfilename = realfilename;
        this.banchinh = banchinh;
    }

    @Override
    public String toString() {
        return "AttachmentModel{" +
                "id=" + id +
                ", tdphieuid=" + tdphieuid +
                ", filename='" + filename + '\'' +
                ", data=" + Arrays.toString(data) +
                ", ngaytao=" + ngaytao +
                ", nguoitao='" + nguoitao + '\'' +
                ", ngaysua=" + ngaysua +
                ", nguoisua='" + nguoisua + '\'' +
                ", loaiphieu=" + loaiphieu +
                ", stt=" + stt +
                ", filepath='" + filepath + '\'' +
                ", mieuta='" + mieuta + '\'' +
                ", realfilename='" + realfilename + '\'' +
                ", banchinh=" + banchinh +
                '}';
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getTdphieuid() {
        return tdphieuid;
    }

    public void setTdphieuid(long tdphieuid) {
        this.tdphieuid = tdphieuid;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public Date getNgaytao() {
        return ngaytao;
    }

    public void setNgaytao(Date ngaytao) {
        this.ngaytao = ngaytao;
    }

    public String getNguoitao() {
        return nguoitao;
    }

    public void setNguoitao(String nguoitao) {
        this.nguoitao = nguoitao;
    }

    public Date getNgaysua() {
        return ngaysua;
    }

    public void setNgaysua(Date ngaysua) {
        this.ngaysua = ngaysua;
    }

    public String getNguoisua() {
        return nguoisua;
    }

    public void setNguoisua(String nguoisua) {
        this.nguoisua = nguoisua;
    }

    public Short getLoaiphieu() {
        return loaiphieu;
    }

    public void setLoaiphieu(Short loaiphieu) {
        this.loaiphieu = loaiphieu;
    }

    public Long getStt() {
        return stt;
    }

    public void setStt(Long stt) {
        this.stt = stt;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public String getMieuta() {
        return mieuta;
    }

    public void setMieuta(String mieuta) {
        this.mieuta = mieuta;
    }

    public String getRealfilename() {
        return realfilename;
    }

    public void setRealfilename(String realfilename) {
        this.realfilename = realfilename;
    }

    public Boolean getBanchinh() {
        return banchinh;
    }

    public void setBanchinh(Boolean banchinh) {
        this.banchinh = banchinh;
    }
}
