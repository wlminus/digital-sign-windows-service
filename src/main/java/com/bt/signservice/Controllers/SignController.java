package com.bt.signservice.Controllers;

import com.bt.signservice.Controllers.errors.BadRequestAlertException;
import com.bt.signservice.DigitalSignProvider.BTCertProvider;
import com.bt.signservice.Model.CertModel;
import com.bt.signservice.Model.SignRequestModel;
import com.bt.signservice.Model.SignResponseModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.util.List;

@RestController
public class SignController {
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

    @RequestMapping(value = "/sign", method = RequestMethod.POST)
    public ResponseEntity<SignResponseModel> signRequest(@RequestBody SignRequestModel signRequest) {
        try {
            return ResponseEntity.ok(BTCertProvider.signSinglePdfDocument(signRequest));
        } catch (CertificateException certExc) {

        } catch (UnrecoverableKeyException unrecoverExc) {

        } catch (NoSuchAlgorithmException noAlgExc) {

        } catch (IOException ioExc) {

        } catch (KeyStoreException keyStoreExc) {

        } catch (NoSuchProviderException noProviderExc) {

        } catch (Exception ex) {

        }

    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ResponseEntity<String> test() throws CertificateException, UnrecoverableKeyException, NoSuchAlgorithmException, IOException, KeyStoreException, NoSuchProviderException {
        BTCertProvider.signSinglePdfDocument("Công ty BT", "Hà Nội", "Testing service");
        return ResponseEntity.ok("Done");
    }

    @RequestMapping(value = "/err", method = RequestMethod.GET)
    public ResponseEntity<List<CertModel>> errTest() {
        throw new BadRequestAlertException("File name out of range", "ENTITY_NAME", "file-name-too-long");
    }
}
