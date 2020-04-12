import app from '../main';

export default {
    requestOtp(phoneNumber) {
        return app.axios({
            method: 'post',
            url: 'send_otp',
            data: {
                identifier: phoneNumber,
                identifierType: 'MOBILE'
            }
        });
    }
};
