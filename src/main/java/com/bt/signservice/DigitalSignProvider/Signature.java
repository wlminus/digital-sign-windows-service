package com.bt.signservice.DigitalSignProvider;

import org.apache.pdfbox.pdmodel.interactive.digitalsignature.SignatureInterface;

import java.io.IOException;
import java.io.InputStream;

public class Signature implements SignatureInterface {
    @Override
    public byte[] sign(InputStream inputStream) throws IOException {
        return new byte[0];
    }
}
