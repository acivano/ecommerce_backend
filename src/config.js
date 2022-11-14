const config = {
    puerto: process.env.PORT || 8080,
    mongodb: {
        host: process.env.DB_URL_MONGO,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    },
    firebase: {
        "type": "service_account",
        "project_id": "ecommerce-backend-a7ede",
        "private_key_id": "c2d58e991d7facedec610a1d4c3acacee3756f79",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5bTfbQMyyKt/4\nxBrBrQpv7BUn+Rloyq8/c3EZaCkrdb664CK3PcY3GJo3JOX1BC+9LpPn46vWA37o\nXtOcVZx+YHSrVHo5LnXxKPjqmp4b1eSxhz9chMtC/ZNzhlSZpDTl8rkQmtpqay9m\nRYfCd9YxK6GoN20cYAufmLIk589xQxTsspvSyJgpd6nTWdoC2LAVpuhQEmiaFWDE\nu+hKcqRwqolaxqxeYeu4xrjdA2SwCNkhZMFq441q4q/9QsNVf5Ve65aHXFfduikL\nvgfYWuW1rlbFmB9EXXMgO1OXMPhmewIPaRf8XB8okGumYSpybmePhdG4Pqdd4Zab\n6pL3zBOnAgMBAAECggEAFDSsGQbLJ4EXje6kscUu9XpG5ee1lp87kJD+WpPopJU8\nlvWUot4m6tsR9v9c1aHCp/1a3bKIB5ay7hRjP85ucrEFFaRrey6uaHyb/0ihAQyC\nUrwXsffAhIjIWBbjwihMIWCdPQt60IzkieL6w7y2SP5lq8R6bdSjf50ukGn4R3Gl\n52mmGNBRujl2P5nsX6SU+/ZlMnWmpjuk0p1QlXXunUJyJC4b8poWYf12dSFQHqB7\nchetd0haNvYn0rGCVu0FDwh3GlHtTumAQ45Rq1wZeFEp4Zu4XqwEQbuwOs84ZKkN\nVpilqyetnEwT+sWlmxYcOdZyDv59HbSInYJjeVbz4QKBgQDfBB8z4YweUvg0XTgS\nu/obOwHrnhC0y/9rl8nNGp81Ulr1hhRloJEbAeEDPsZ2rsovFV8+2cWVhJl4TX2R\nFVo4hYnskhtCVmtJJTGfLNG1jYdpWZsLvfmfnRBoCBQ1eEfKQD6/RPJgJDsZty0a\nwoBGalzYKPmX6er/rp6kmZt34QKBgQDU2eBwwxGMQvarGpvfoeLXuYa+nSY1XAvr\nKkCV7zGME2Sx3a9ZqThuWRd8EA9S2BbINZlyndA3ewTiICyKnYOWKpLb2LgXRdvR\nZgRKWuy5Dw3z+NhQ7zXIlot5kPXTFW+1pOcNdpJZ4EO+xUs9mT/Uwel51vGa498i\nXpce0xtchwKBgQCBYN7JNlwXa4Lavgm9tJfQHFds3XJLsN0pChHkj0E1qeVi8rn6\ni0AjLt/fBhgU2iopTnjG+YeKyjZOeIYUGRMSH0Z4m/p8ba4n7Q/wjAvNC6I3F+i+\n0yNx2aie8bDnpDPhvYupYtJJvDsdHAtqrtPEBgh+zqad3vKaCi+2xfZPgQKBgGf1\ndkp86/AusJ2HZIRIZCvrAGXPCV9ccrHMNDlG11NMEY1R8hf/r4Et4GuGyIU054On\nsiep7o16dzsebcLSBfftGUdpRRiQ1Tkj84qBeEc2lCEJ9FUrUICFDuA0LeyH9sSo\nIvWPaRGemFfvsr0GQYffofIRSnXVQCFgQ70ZbK63AoGALGFqrxDUmrzJwvBC4pWI\nUFC675G8QSETnb+sys2k8I0J1JvLvO068NvSox8AjqzInJmJFfLT6GugXGersEUW\nzU+jaH5qcagsr+rP24B/6qvKVhx7cBNf1EYQPOCUb/5Wbm+32cqAxT/FVzCyM6bd\nkwiqBDiTVZ1e793mKsnY888=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-cya0a@ecommerce-backend-a7ede.iam.gserviceaccount.com",
        "client_id": "110595344266575178464",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cya0a%40ecommerce-backend-a7ede.iam.gserviceaccount.com"
    }      
}             

module.exports = config;