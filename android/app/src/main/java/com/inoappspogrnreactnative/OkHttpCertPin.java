package com.inoappspogrnreactnative;

import android.util.Log;

import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

public class OkHttpCertPin {
    private static String hostname = "*.cl-test.camdenliving.com";
    private static final String TAG = "OkHttpCertPin";

    public static OkHttpClient extend(OkHttpClient currentClient){
        try {
            CertificatePinner certificatePinner = new CertificatePinner.Builder()
                    .add(hostname, "sha512/MIIFWTCCBEGgAwIBAgIQC0xBOltHEVcLDNTQICtg7TANBgkqhkiG9w0BAQsFADBN\n" +
                            "MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMScwJQYDVQQDEx5E\n" +
                            "aWdpQ2VydCBTSEEyIFNlY3VyZSBTZXJ2ZXIgQ0EwHhcNMTcxMTMwMDAwMDAwWhcN\n" +
                            "MTkxMjA1MTIwMDAwWjCBhDELMAkGA1UEBhMCVVMxDjAMBgNVBAgTBVRleGFzMRAw\n" +
                            "DgYDVQQHEwdIb3VzdG9uMSEwHwYDVQQKExhDYW1kZW4gRGV2ZWxvcG1lbnQsIElu\n" +
                            "Yy4xCzAJBgNVBAsTAklUMSMwIQYDVQQDDBoqLmNsLXRlc3QuY2FtZGVubGl2aW5n\n" +
                            "LmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMCFsrGGEh94mjeE\n" +
                            "1rZfmrF7XoKzC+qFW49GViAlQA2zJ5+y6cxJnO2EQtMuJ8NB5/CSGQlV33w9YnCn\n" +
                            "EAc2AFrm7aemiplF3OvUdpzMoiWI/s0h3L6J1ioD4XSNrgXanQC9cC/WRjj6xDlS\n" +
                            "Zgv11DjPFtTm3PUo+RbXcgssnS5VxVgG2/i6IeNkaXrVLcn+MOfEJA7fz8PJy9cY\n" +
                            "ocIiYCZIARluZjxn/mbqRehG9KvVTjTqG/ckTlxVCVKR0Gs8NW5U5r3c6y1b+6lZ\n" +
                            "c665JiDlqXymWsq1qXLn52NtZovBCdKo/MDWxHCCI0f8BpqpiUswizdKeuxXdrBo\n" +
                            "uAeSoOECAwEAAaOCAfswggH3MB8GA1UdIwQYMBaAFA+AYRyCMWHVLyjnjUY4tCzh\n" +
                            "xtniMB0GA1UdDgQWBBRSw9YNVHhwKUUXTlq4ObfJfO6szjA/BgNVHREEODA2ghoq\n" +
                            "LmNsLXRlc3QuY2FtZGVubGl2aW5nLmNvbYIYY2wtdGVzdC5jYW1kZW5saXZpbmcu\n" +
                            "Y29tMA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUH\n" +
                            "AwIwawYDVR0fBGQwYjAvoC2gK4YpaHR0cDovL2NybDMuZGlnaWNlcnQuY29tL3Nz\n" +
                            "Y2Etc2hhMi1nNi5jcmwwL6AtoCuGKWh0dHA6Ly9jcmw0LmRpZ2ljZXJ0LmNvbS9z\n" +
                            "c2NhLXNoYTItZzYuY3JsMEwGA1UdIARFMEMwNwYJYIZIAYb9bAEBMCowKAYIKwYB\n" +
                            "BQUHAgEWHGh0dHBzOi8vd3d3LmRpZ2ljZXJ0LmNvbS9DUFMwCAYGZ4EMAQICMHwG\n" +
                            "CCsGAQUFBwEBBHAwbjAkBggrBgEFBQcwAYYYaHR0cDovL29jc3AuZGlnaWNlcnQu\n" +
                            "Y29tMEYGCCsGAQUFBzAChjpodHRwOi8vY2FjZXJ0cy5kaWdpY2VydC5jb20vRGln\n" +
                            "aUNlcnRTSEEyU2VjdXJlU2VydmVyQ0EuY3J0MAwGA1UdEwEB/wQCMAAwDQYJKoZI\n" +
                            "hvcNAQELBQADggEBAH9q8KVxVV3ZJlDYNhSgEOn9K+zRqSv+qpo+ggUvk0EAMlJB\n" +
                            "Bhof2zV9UT7N2rkjS0qpXkB0WT5T/zGLSIjoIOgGzR2IbWAnPBOrI1iHoDFfuGw5\n" +
                            "Y0PvWZ4f3pFZxCx7STQTZ1y048/gFdS6SsF88VWlGg+nuuQ2EE4cY1fsW0TMDHJ8\n" +
                            "t35KTQhjc9qmtCh6t+M0bYP6CGWhtqO/ai8G5/QLAG7UqUE6efAHqOinYPVT2ytD\n" +
                            "TYlL6LYFgOecr2Sl6VYTYLxgN9iQGrlztE0kCs6gQpzB650J/W9J+TkCBcp7w4OE\n" +
                            "WzpTQ6b/IoMGC3WfwVEmRCTghPOitbwJX0n7cXQ=")
                    .build();
            return currentClient.newBuilder().certificatePinner(certificatePinner).build();
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
        return currentClient;
    }
}
