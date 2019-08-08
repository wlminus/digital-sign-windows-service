package com.bt.signservice.DigitalSignProvider;

import com.bt.signservice.Model.CertModel;
import com.bt.signservice.Model.SignRequestModel;
import com.bt.signservice.Model.SignResponseModel;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.bouncycastle.asn1.cmp.CertResponse;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.*;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class BTCertProvider {
    private final static String rootPath = System.getProperty("user.dir") + "/sign";
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
                als,
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

//    public static boolean signSinglePdfDocumentTest(String name, String location, String reason) throws CertificateException, NoSuchAlgorithmException, IOException, NoSuchProviderException, KeyStoreException, UnrecoverableKeyException {
//        KeyStore keyStore = KeyStore.getInstance("Windows-MY", "SunMSCAPI");
//        keyStore.load(null);
//
//        boolean externalSig = false;
//        String tsaUrl = null;
//
////        CreateSignature signing = new CreateSignature(keyStore, "0000000".toCharArray());
//        CreateSignature signing = new CreateSignature(keyStore, "1212".toCharArray());
//        // sign PDF
//        signing.setExternalSigning(false);
//        File inFile = new File("D:\\wlminus\\Stuff\\TestSign\\javadoc.pdf");
//        String fileName = inFile.getName();
//        String substring = fileName.substring(0, fileName.lastIndexOf('.'));
//        File outFile = new File(inFile.getParent(), substring + "_signed.pdf");
//        signing.signDetached(inFile, outFile, null, name, location, reason);
//        return true;
//    }
//System.getProperty("user.dir")

    public static String signSinglePdfDocument(SignRequestModel signRequest) throws CertificateException, NoSuchAlgorithmException, IOException, NoSuchProviderException, KeyStoreException, UnrecoverableKeyException {
        Path filepath = Paths.get(rootPath + "/" + signRequest.getFileName());
        OutputStream os = Files.newOutputStream(filepath);
        os.write(signRequest.getInputFile().getBytes());
        os.close();

        KeyStore keyStore = KeyStore.getInstance("Windows-MY", "SunMSCAPI");
        keyStore.load(null);

        boolean externalSig = false;
        String tsaUrl = null;

        /// Need edit
        CreateSignature signing = new CreateSignature(keyStore, signRequest.getSelectedCertAlias());
        // sign PDF
        signing.setExternalSigning(externalSig);
        File inFile = new File(rootPath, signRequest.getFileName());
        String fileName = inFile.getName();
        String substring = fileName.substring(0, fileName.lastIndexOf('.'));
        File outFile = new File(inFile.getParent(), substring + "_signed.pdf");
        signing.signDetached(inFile, outFile, tsaUrl, signRequest.getName(), signRequest.getLocation(), signRequest.getReason());

        return rootPath + substring + "_signed.pdf";
    }

    public static String sendSignedFileToServer(String pathToSignedFile, String serverUrl) throws IOException {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(serverUrl);
        File fileNeedToSend = new File(pathToSignedFile);
        FileBody fileBody = new FileBody(fileNeedToSend, ContentType.DEFAULT_BINARY);
        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
        builder.addPart("uploadFile", fileBody);

        HttpEntity entity = builder.build();
        post.setEntity(entity);
        HttpResponse response = client.execute(post);
        return response.toString();
    }
}
