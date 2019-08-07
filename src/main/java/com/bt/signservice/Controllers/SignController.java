package com.bt.signservice.Controllers;

import com.bt.signservice.Controllers.errors.BadRequestAlertException;
import com.bt.signservice.DigitalSignProvider.BTCertProvider;
import com.bt.signservice.Model.CertModel;
import com.bt.signservice.Model.SignRequestModel;
import com.bt.signservice.Model.SignResponseModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.util.List;

@RestController
public class SignController {

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
     *     String certAlias: Alias user choose
     *     String pathToFile: Path to file need to sign
     *     String ext: must be pdf
     *     String serverUploadEndpoint: endpoint of upload server to push file to server
     *     String cookieStr: Cookie string of request push file
     *     String token: Token of request push file
     *     String name: information of signature
     *     String location: information of signature
     *     String reason: information of signature
     * }
     * @return SignResponseModel
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/sign", method = RequestMethod.POST)
    public ResponseEntity<String> signRequest(@RequestBody SignRequestModel signRequest) {
        try {
            System.out.println("Request to sign document");
            String pathToSignedFile = BTCertProvider.signSinglePdfDocument(signRequest);
            System.out.println("Sign done");

            String response = BTCertProvider.sendSignedFileToServer(pathToSignedFile, signRequest.getServerUploadEndpoint());
            return ResponseEntity.ok(response);
        } catch (CertificateException certExc) {
            throw new BadRequestAlertException("Lỗi Certificate", certExc.getMessage(), "");
        } catch (NoSuchAlgorithmException noAlgExc) {
            throw new BadRequestAlertException("Lỗi không có thuật toán", noAlgExc.getMessage(), "");
        } catch (IOException ioExc) {
            throw new BadRequestAlertException("Lỗi vào ra", ioExc.getMessage(), "");
        } catch (KeyStoreException keyStoreExc) {
            throw new BadRequestAlertException("Lỗi keystore", keyStoreExc.getMessage(), "");
        } catch (NoSuchProviderException noProviderExc) {
            throw new BadRequestAlertException("Lỗi không có keystore", noProviderExc.getMessage(), "");
        } catch (Exception ex) {
            throw new BadRequestAlertException("Lỗi không xác định", ex.getMessage(), "");
        }
    }

//    @RequestMapping(value = "/test", method = RequestMethod.GET)
//    public ResponseEntity<String> test() throws CertificateException, UnrecoverableKeyException, NoSuchAlgorithmException, IOException, KeyStoreException, NoSuchProviderException {
////        SignRequestModel signRequestModel = new SignRequestModel()
//        BTCertProvider.signSinglePdfDocumentTest("Công ty BT", "Hà Nội", "Testing service");
//        return ResponseEntity.ok("Done");
//    }
}
