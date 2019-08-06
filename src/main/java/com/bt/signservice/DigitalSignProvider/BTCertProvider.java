package com.bt.signservice.DigitalSignProvider;

import com.bt.signservice.Model.CertModel;
import com.bt.signservice.Model.SignRequestModel;
import com.bt.signservice.Model.SignResponseModel;

import java.io.File;
import java.io.IOException;
import java.security.*;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class BTCertProvider {
    public static List<CertModel> getCertList() throws NoSuchProviderException, KeyStoreException, CertificateException, NoSuchAlgorithmException, IOException {
        KeyStore keyStore = KeyStore.getInstance("Windows-MY", "SunMSCAPI");
        keyStore.load(null);
        List<CertModel> dataCertReturn = new ArrayList<CertModel>();
        long index = 0L;
        for (String als: Collections.list(keyStore.aliases())) {
            X509Certificate cert = (X509Certificate)keyStore.getCertificate(als);
            boolean isValid = (new Date()).compareTo(cert.getNotAfter()) <= 0;
            CertModel tmp = new CertModel(
                    index,
                    isValid,
                cert.getIssuerX500Principal(),
                cert.getSubjectX500Principal(),
                cert.getSigAlgName(),
                cert.getSigAlgOID(),
                cert.getVersion(),
                cert.getNotAfter()
            );
            index++;
            dataCertReturn.add(tmp);
        }
        return dataCertReturn;
    }

    public static boolean signSinglePdfDocument(String name, String location, String reason) throws CertificateException, NoSuchAlgorithmException, IOException, NoSuchProviderException, KeyStoreException, UnrecoverableKeyException {
        KeyStore keyStore = KeyStore.getInstance("Windows-MY", "SunMSCAPI");
        keyStore.load(null);

        boolean externalSig = false;
        String tsaUrl = null;

        CreateSignature signing = new CreateSignature(keyStore, "0000000".toCharArray());
        // sign PDF
        signing.setExternalSigning(false);
        File inFile = new File("D:\\wlminus\\Stuff\\TestSign\\javadoc.pdf");
        String fileName = inFile.getName();
        String substring = fileName.substring(0, fileName.lastIndexOf('.'));
        File outFile = new File(inFile.getParent(), substring + "_signed.pdf");
        signing.signDetached(inFile, outFile, null, name, location, reason);


        return true;
    }

    public static SignResponseModel signSinglePdfDocument(SignRequestModel signRequest) throws CertificateException, NoSuchAlgorithmException, IOException, NoSuchProviderException, KeyStoreException, UnrecoverableKeyException {
        KeyStore keyStore = KeyStore.getInstance("Windows-MY", "SunMSCAPI");
        keyStore.load(null);

        boolean externalSig = false;
        String tsaUrl = null;

        CreateSignature signing = new CreateSignature(keyStore, "0000000".toCharArray());
        // sign PDF
        signing.setExternalSigning(false);
        File inFile = new File("D:\\wlminus\\Stuff\\TestSign\\javadoc.pdf");
        String fileName = inFile.getName();
        String substring = fileName.substring(0, fileName.lastIndexOf('.'));
        File outFile = new File(inFile.getParent(), substring + "_signed.pdf");
        signing.signDetached(inFile, outFile, null, signRequest.getName(), signRequest.getLocation(), signRequest.getReason());

        return new SignResponseModel();
    }
}
