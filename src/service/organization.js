export default app => {
    return {
        fetchVoucher(voucherId) {
            return app.axios({
                method: 'post',
                url: 'vouchers/voucher_code',
                data: {
                    voucher_code: voucherId
                }
            });
        },
        fetchOrganization() {
            return app.axios({
                method: 'get',
                url: 'organizations/current'
            });
        },
        uploadVoucher(formData) {
            return app.axios({
                method: 'post',
                url: 'orders/createOrder',
                data: formData
            });
        }
    };
};
