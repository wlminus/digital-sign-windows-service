package com.bt.signservice.Controllers;

import com.bt.signservice.Controllers.errors.BadRequestAlertException;
import com.bt.signservice.DigitalSignProvider.BTCertProvider;
import com.bt.signservice.Model.CertModel;
import com.bt.signservice.Model.SignRequestModel;
import com.bt.signservice.Model.SignResponseModel;
import com.bt.signservice.service.LogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.text.SimpleDateFormat;
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
     * @param signRequest {
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
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/sign", method = RequestMethod.POST)
    public ResponseEntity<String> signRequest(@RequestBody SignRequestModel signRequest) {
        try {
            LogService ls = new LogService();
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            Date date = new Date();

            ls.WriteLogToFile(formatter.format(date) + "Start request sign of" + signRequest.getSelectedCertAlias() + "\n");
            String pathToSignedFile = BTCertProvider.signSinglePdfDocument(signRequest);

            ls.WriteLogToFile(formatter.format(date) + "Sign done, path to file" + pathToSignedFile + "\n");
            if (signRequest.isUpload()) {
                ls.WriteLogToFile(formatter.format(date) + "Start send server url " + signRequest.getServerUploadEndpoint() + "\n");
                String response = BTCertProvider.sendSignedFileToServer(pathToSignedFile, signRequest.getServerUploadEndpoint());

                ls.WriteLogToFile(formatter.format(date) + "Send server done"+ "\n");
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.ok("Đã kí vào file");
            }

        } catch (CertificateException certExc) {
            throw new BadRequestAlertException("Lỗi Certificate", certExc.getMessage(), "");
        } catch (NoSuchAlgorithmException noAlgExc) {
            throw new BadRequestAlertException("Lỗi không có thuật toán", noAlgExc.getMessage(), "");
        } catch (IOException ioExc) {
            throw new BadRequestAlertException("Lỗi vào ra", ioExc.getMessage(), "");
        } catch (KeyStoreException keyStoreExc) {
            throw new BadRequestAlertException("Không tải được keystore", keyStoreExc.getMessage(), "");
        } catch (NoSuchProviderException noProviderExc) {
            throw new BadRequestAlertException("Lỗi không có keystore", noProviderExc.getMessage(), "");
        } catch (Exception ex) {
            throw new BadRequestAlertException("Lỗi không xác định", ex.getMessage(), "");
        }
    }

//    @RequestMapping(value = "/test", method = RequestMethod.GET)
//    public ResponseEntity<String> test() throws IOException {
//        BTCertProvider.sendSignedFileToServer("D:\\wlminus\\Stuff\\TestSign\\javadoc_signed.pdf", "http://localhost:8896/upload");
//
//        return ResponseEntity.ok("Done");
//    }
}
