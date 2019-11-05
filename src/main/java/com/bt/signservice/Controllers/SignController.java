package com.bt.signservice.Controllers;

import com.bt.signservice.Controllers.errors.BadRequestAlertException;
import com.bt.signservice.DigitalSignProvider.BTCertProvider;
import com.bt.signservice.Model.AttachmentModel;
import com.bt.signservice.Model.CertModel;
import com.bt.signservice.Model.SignRequestModel;
import com.bt.signservice.service.LogService;
import org.apache.commons.io.FileUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@RestController
public class SignController {
    /**
     * Request to load available certificate of computer
     * @return List<CertModel>
     *     long id: id of cert service named when init request
     *     boolean valid: flag check is certificate valid at the time init request
     *     String alias: alias of that cert
     *     X500Principal issuer: info of issuer - for optional use
     *     X500Principal subject: info of subject - for optional use
     *     String algName: algorithm use in cert
     *     String algOID: algorithm id use in cert
     *     int version: version of cert
     *     Date notAfter: day valid of cert
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/cert", method = RequestMethod.GET)
    public ResponseEntity<List<CertModel>> getCert() {
        try {
            return new ResponseEntity<>(BTCertProvider.getCertList(), HttpStatus.OK);
        } catch (NoSuchProviderException noSuchProviderExc) {
            throw new BadRequestAlertException("Không tìm thấy token: ", noSuchProviderExc.getMessage(), "");
        } catch (KeyStoreException keyStoreExc) {
            throw new BadRequestAlertException("Lỗi hệ thống KeyStore", keyStoreExc.getMessage(), "");
        } catch (CertificateException certExc) {
            throw new BadRequestAlertException("Lỗi hệ thống Certificate", certExc.getMessage(), "");
        } catch (NoSuchAlgorithmException noSuchAlgExc) {
            throw new BadRequestAlertException("Không có thuật toán mã hóa", noSuchAlgExc.getMessage(), "");
        } catch (IOException ioExc) {
            throw new BadRequestAlertException("Lỗi in/out hệ thống", ioExc.getMessage(), "");
        } catch (Exception ex) {
            throw new BadRequestAlertException("Lỗi không xác định", ex.getMessage(), "");
        }
    }

    /**
     * Request for signing pdf document
     * param SignRequestModel {
     *     CertModel selectedCert: select cert of user
     *     String selectedCertAlias: alias of that cert
     *     MultipartFile inputFile: input file to sign send by client
     *     String fileName: Name of file
     *     String ext: extension of file (must be pdf at this time)
     *     boolean isUpload: flag is file gonna push to remote server
     *     String serverUploadEndpoint: endpoint of server file will be uploaded, care when isUpload = true
     *     String cookieStr: (optional) cookie string of request send file to server
     *     Map<String, String> token: (optional) token of request send file to server
     *     String name: info will be sign to document
     *     String location: info will be sign to document
     *     String reason: info will be sign to document
     * }
     * @return SignResponseModel
     */
//    @CrossOrigin(origins = "*", allowedHeaders = "*")
////    @RequestMapping(value = "/sign", method = RequestMethod.POST)
////    public ResponseEntity<String> signRequest(@RequestBody SignRequestModel signRequest) {
////        try {
////            LogService ls = new LogService();
////            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
////            Date date = new Date();
////
////            ls.WriteLogToFile(formatter.format(date) + "Start request sign of" + signRequest.getSelectedCertAlias() + "\n");
////            String pathToSignedFile = BTCertProvider.signSinglePdfDocument(signRequest);
////
////            ls.WriteLogToFile(formatter.format(date) + "Sign done, path to file" + pathToSignedFile + "\n");
////            if (signRequest.isUpload()) {
////                ls.WriteLogToFile(formatter.format(date) + "Start send server url " + signRequest.getServerUploadEndpoint() + "\n");
////                String response = BTCertProvider.sendSignedFileToServer(pathToSignedFile, signRequest.getServerUploadEndpoint());
////
////                ls.WriteLogToFile(formatter.format(date) + "Send server done"+ "\n");
////                return ResponseEntity.ok(response);
////            } else {
////                return ResponseEntity.ok("Đã kí vào file");
////            }
////
////        } catch (CertificateException certExc) {
////            throw new BadRequestAlertException("Lỗi Certificate", certExc.getMessage(), "");
////        } catch (NoSuchAlgorithmException noAlgExc) {
////            throw new BadRequestAlertException("Lỗi không có thuật toán", noAlgExc.getMessage(), "");
////        } catch (IOException ioExc) {
////            throw new BadRequestAlertException("Lỗi vào ra", ioExc.getMessage(), "");
////        } catch (KeyStoreException keyStoreExc) {
////            throw new BadRequestAlertException("Không tải được keystore", keyStoreExc.getMessage(), "");
////        } catch (NoSuchProviderException noProviderExc) {
////            throw new BadRequestAlertException("Lỗi không có keystore", noProviderExc.getMessage(), "");
////        } catch (Exception ex) {
////            throw new BadRequestAlertException("Lỗi không xác định", ex.getMessage(), "");
////        }
////    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/btsign", method = RequestMethod.POST)
    public String btsign(@RequestBody String stringRequest) {
        try {
            JSONObject obj = new JSONObject(stringRequest);
            String location = obj.getString("location");
            String name = obj.getString("selectedCertAlias");
            String reason = obj.getString("reason");

            String selectedCertAlias = obj.getString("selectedCertAlias");
            String serverUploadEndpoint = obj.getString("serverUploadEndpoint");
            String token = obj.getString("token");

//            String dataAttachment = obj.getString("dataAttachment").replace("\\\"", "\"");
//            JSONArray obj2 = new JSONArray(dataAttachment);
            JSONArray obj2 = obj.getJSONArray("dataAttachment");

            for(int n = 0; n < obj2.length(); n++)
            {
                JSONObject attachmentItem = obj2.getJSONObject(n);
                String pathToNewFile = BTCertProvider.signSinglePdfByDataFromServer(attachmentItem, selectedCertAlias, name, location, reason);

                HttpPost post = new HttpPost(serverUploadEndpoint);
                post.setHeader(HttpHeaders.AUTHORIZATION, token);
                post.setHeader(HttpHeaders.CONTENT_TYPE, "application/json;charset=UTF-8");

                File fileNeedToSend = new File(pathToNewFile);
                String encoded = Base64.getEncoder().encodeToString(FileUtils.readFileToByteArray(fileNeedToSend));

                String oldName = attachmentItem.getString("fileName");

                String newFileName = attachmentItem.getString("fileName").substring(0, attachmentItem.getString("fileName").lastIndexOf('.')) + "_signed.pdf";
                String newRealFileName = attachmentItem.getString("realfilename").substring(0, attachmentItem.getString("realfilename").lastIndexOf('.')) + "_signed.pdf";

                attachmentItem.remove("fileName");
                attachmentItem.remove("data");
                attachmentItem.remove("realfilename");
                attachmentItem.remove("isSigned");

                attachmentItem.put("fileName", newFileName);
                attachmentItem.put("data", encoded);
                attachmentItem.put("realfilename", newRealFileName);
                attachmentItem.put("isSigned", "true");

                StringEntity params = new StringEntity(attachmentItem.toString(), "UTF-8");
                params.setContentType("application/json");
                post.setEntity(params);

                HttpClient client = HttpClientBuilder.create().build();
                HttpResponse response = client.execute(post);
            }
            return "Upload file thành công";
        } catch (NoSuchAlgorithmException noSuchAlgExc) {
            throw new BadRequestAlertException("Không có thuật toán mã hóa", noSuchAlgExc.getMessage(), "");
        } catch (CertificateException certExc) {
            throw new BadRequestAlertException("Lỗi hệ thống Certificate", certExc.getMessage(), "");
        } catch (KeyStoreException keyStoreExc) {
            throw new BadRequestAlertException("Lỗi hệ thống KeyStore", keyStoreExc.getMessage(), "");
        } catch (UnrecoverableKeyException urEx) {
            throw new BadRequestAlertException("Lỗi key: ", urEx.getMessage(), "");
        } catch (IOException ioEx) {
            throw new BadRequestAlertException("Lỗi vào ra: ", ioEx.getMessage(), "");
        } catch (NoSuchProviderException noSuchProviderExc) {
            throw new BadRequestAlertException("Không tìm thấy token: ", noSuchProviderExc.getMessage(), "");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/boss-sign", method = RequestMethod.POST)
    public String bossSign(@RequestBody String stringRequest) {
        try {
            JSONObject obj = new JSONObject(stringRequest);
            String location = obj.getString("location");
            String name = obj.getString("selectedCertAlias");
            String reason = obj.getString("reason");

//            String tableName = obj.getString("tableName");
//            String columnName = obj.getString("columnName");

            String selectedCertAlias = obj.getString("selectedCertAlias");
            String serverUploadEndpoint = obj.getString("serverUploadEndpoint");
            String token = obj.getString("token");

            String fileName = obj.getString("fileName");
            String data = obj.getString("data");

            String pathToNewFile = BTCertProvider.signSingleBOSSPdfByDataFromServer(fileName, data, selectedCertAlias, name, location, reason);

            HttpPost post = new HttpPost(serverUploadEndpoint);
            post.setHeader(HttpHeaders.AUTHORIZATION, token);
            post.setHeader(HttpHeaders.CONTENT_TYPE, "application/json;charset=UTF-8");

            File fileNeedToSend = new File(pathToNewFile);
            String encoded = Base64.getEncoder().encodeToString(FileUtils.readFileToByteArray(fileNeedToSend));

            String newFileName = fileName.substring(0, fileName.lastIndexOf('.')) + "_signed.pdf";

            obj.remove("fileName");
            obj.remove("data");
            obj.remove("isSigned");

            obj.put("fileName", newFileName);
            obj.put("data", encoded);
            obj.put("isSigned", "true");

            StringEntity params = new StringEntity(obj.toString(), "UTF-8");
            params.setContentType("application/json");
            post.setEntity(params);

            HttpClient client = HttpClientBuilder.create().build();
            HttpResponse response = client.execute(post);

            return "Upload file thành công";
        } catch (NoSuchAlgorithmException noSuchAlgExc) {
            throw new BadRequestAlertException("Không có thuật toán mã hóa", noSuchAlgExc.getMessage(), "");
        } catch (CertificateException certExc) {
            throw new BadRequestAlertException("Lỗi hệ thống Certificate", certExc.getMessage(), "");
        } catch (KeyStoreException keyStoreExc) {
            throw new BadRequestAlertException("Lỗi hệ thống KeyStore", keyStoreExc.getMessage(), "");
        } catch (UnrecoverableKeyException urEx) {
            throw new BadRequestAlertException("Lỗi key: ", urEx.getMessage(), "");
        } catch (IOException ioEx) {
            throw new BadRequestAlertException("Lỗi vào ra: ", ioEx.getMessage(), "");
        } catch (NoSuchProviderException noSuchProviderExc) {
            throw new BadRequestAlertException("Không tìm thấy token: ", noSuchProviderExc.getMessage(), "");
        }
    }

//    @RequestMapping(value = "/test", method = RequestMethod.GET)
//    public ResponseEntity<String> test() throws IOException {
//        BTCertProvider.sendSignedFileToServer("D:\\wlminus\\Stuff\\TestSign\\javadoc_signed.pdf", "http://localhost:8896/upload");
//
//        return ResponseEntity.ok("Done");
//    }
}
