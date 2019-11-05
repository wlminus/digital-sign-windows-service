package com.bt.signservice.DigitalSignProvider;

import com.bt.signservice.Model.CertModel;
import com.bt.signservice.Model.Constant;
import com.bt.signservice.Model.SignRequestModel;
//import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FileUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONObject;
import sun.security.x509.X500Name;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.*;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.*;

public class BTCertProvider {
    public static List<CertModel> getCertList() throws NoSuchProviderException, KeyStoreException, CertificateException, NoSuchAlgorithmException, IOException {
        KeyStore keyStore = KeyStore.getInstance("Windows-MY", "SunMSCAPI");
        keyStore.load(null);
        List<CertModel> dataCertReturn = new ArrayList<CertModel>();
        long index = 0L;
        for (String als: Collections.list(keyStore.aliases())) {
            X509Certificate cert = (X509Certificate)keyStore.getCertificate(als);
            boolean isValid = (new Date()).compareTo(cert.getNotAfter()) <= 0;
            X500Name x500name = new X500Name(cert.getSubjectX500Principal().getName());
            String cn = x500name.getCommonName();

            CertModel tmp = new CertModel(
                index,
                isValid,
                als,
                cert.getIssuerX500Principal(),
                    cn,
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
        Path filepath = Paths.get(Constant.ROOT_UPLOAD_PATH + "/" + signRequest.getFileName());
        OutputStream os = Files.newOutputStream(filepath);
        byte[] decodedBytes = Base64.getDecoder().decode(signRequest.getInputFile());
        os.write(decodedBytes);
        os.close();

        KeyStore keyStore = KeyStore.getInstance("Windows-MY", "SunMSCAPI");
        keyStore.load(null);

        boolean externalSig = false;
        String tsaUrl = null;

        /// Need edit
        CreateSignature signing = new CreateSignature(keyStore, signRequest.getSelectedCertAlias());
        // sign PDF
        signing.setExternalSigning(externalSig);
        File inFile = new File(Constant.ROOT_UPLOAD_PATH, signRequest.getFileName());
        String fileName = inFile.getName();
        String substring = fileName.substring(0, fileName.lastIndexOf('.'));
        File outFile = new File(inFile.getParent(), substring + "_signed.pdf");
        signing.signDetached(inFile, outFile, tsaUrl, signRequest.getName(), signRequest.getLocation(), signRequest.getReason());

        return Constant.ROOT_UPLOAD_PATH + "/" + substring + "_signed.pdf";
    }

    public static String signSinglePdfByDataFromServer(JSONObject data, String selectedCertAlias, String name, String location, String reason) throws IOException, NoSuchProviderException, KeyStoreException, CertificateException, NoSuchAlgorithmException, UnrecoverableKeyException {
        Path filepath = Paths.get(Constant.ROOT_UPLOAD_PATH + "/" + data.getString("fileName"));
        OutputStream os = Files.newOutputStream(filepath);
        byte[] decodedBytes = Base64.getDecoder().decode(data.getString("data"));

        os.write(decodedBytes);
        os.close();

        KeyStore keyStore = KeyStore.getInstance("Windows-MY", "SunMSCAPI");
        keyStore.load(null);

        boolean externalSig = false;
        String tsaUrl = null;

        /// Need edit
        CreateSignature signing = new CreateSignature(keyStore, selectedCertAlias);
        // sign PDF
        signing.setExternalSigning(externalSig);
        File inFile = new File(Constant.ROOT_UPLOAD_PATH, data.getString("fileName"));
        String fileName = inFile.getName();
        String substring = fileName.substring(0, fileName.lastIndexOf('.'));
        File outFile = new File(inFile.getParent(), substring + "_signed.pdf");
        signing.signDetached(inFile, outFile, tsaUrl, name, location, reason);

        return Constant.ROOT_UPLOAD_PATH + "/" + substring + "_signed.pdf";
    }

    public static String sendSignedFileToServer(String pathToSignedFile, String serverUrl) throws IOException {
        HttpPost post = new HttpPost(serverUrl);
        File fileNeedToSend = new File(pathToSignedFile);

        HttpEntity entity = MultipartEntityBuilder.create()
                .addPart("uploadFile", new FileBody(fileNeedToSend))
                .build();

        post.setEntity(entity);

        HttpClient client = HttpClientBuilder.create().build();
        HttpResponse response = client.execute(post);

        return response.toString();
    }

    public static String signSingleBOSSPdfByDataFromServer(String fileName, String data, String selectedCertAlias, String name, String location, String reason) throws IOException, NoSuchProviderException, KeyStoreException, CertificateException, NoSuchAlgorithmException, UnrecoverableKeyException {
        Path filepath = Paths.get(Constant.ROOT_UPLOAD_PATH + "/" + fileName);
        OutputStream os = Files.newOutputStream(filepath);
        byte[] decodedBytes = Base64.getDecoder().decode(data);

        os.write(decodedBytes);
        os.close();

        KeyStore keyStore = KeyStore.getInstance("Windows-MY", "SunMSCAPI");
        keyStore.load(null);

        boolean externalSig = false;
        String tsaUrl = null;

        /// Need edit
        CreateSignature signing = new CreateSignature(keyStore, selectedCertAlias);
        // sign PDF
        signing.setExternalSigning(externalSig);
        File inFile = new File(Constant.ROOT_UPLOAD_PATH, fileName);
//        String fileName = inFile.getName();
        String substring = fileName.substring(0, fileName.lastIndexOf('.'));
        File outFile = new File(inFile.getParent(), substring + "_signed.pdf");
        signing.signDetached(inFile, outFile, tsaUrl, name, location, reason);

        return Constant.ROOT_UPLOAD_PATH + "/" + substring + "_signed.pdf";
    }
//    public static String sendToBTServer(String pathToSignedFile, String serverUrl) throws IOException {
//        HttpPost post = new HttpPost(serverUrl);
//        File fileNeedToSend = new File(pathToSignedFile);
//        String encoded = Base64.getEncoder().encodeToString(FileUtils.readFileToByteArray(fileNeedToSend));
//
//        HttpEntity entity = MultipartEntityBuilder.create()
//                .addTextBody("tdphieuid", String.valueOf(fileNeedToSend))
//                .addTextBody("filename", new FileBody(fileNeedToSend))
//                .addTextBody("data", new String)
//                .addTextBody("ngaytao", new FileBody(fileNeedToSend))
//                .addTextBody("nguoitao", new FileBody(fileNeedToSend))
//                .addTextBody("ngaysua", new FileBody(fileNeedToSend))
//                .addTextBody("nguoisua", new FileBody(fileNeedToSend))
//                .addTextBody("loaiphieu", new FileBody(fileNeedToSend))
//                .addTextBody("stt", new FileBody(fileNeedToSend))
//                .addTextBody("filepath", new FileBody(fileNeedToSend))
//                .addTextBody("mieuta", new FileBody(fileNeedToSend))
//                .addTextBody("realfilename", new FileBody(fileNeedToSend))
//                .addTextBody("banchinh", new FileBody(fileNeedToSend))
//                .addTextBody("masothue", new FileBody(fileNeedToSend))
//                .addTextBody("isSigned", new FileBody(fileNeedToSend))
//                .build();
//
//        post.setEntity(entity);
//
//        HttpClient client = HttpClientBuilder.create().build();
//        HttpResponse response = client.execute(post);
//
//        return response.toString();
//    }
}
