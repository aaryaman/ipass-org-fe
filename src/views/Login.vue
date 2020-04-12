<template>
    <section class="page-wrap">
        <div class="content-wrap">
            <div class="logo">
                <img src="../assets/bmc.jpeg" alt />
            </div>
            <form ref="otpForm" class="log-in-form" v-if="otpForm">
                <h2 class="text-center">
                    Enter your Phone Number to get an OTP
                </h2>
                <b-field label="Phone Number">
                    <b-input v-model="form.phoneNumber"></b-input>
                </b-field>
                <b-button
                    type="is-primary"
                    @click="requestOtp"
                    :disabled="isLoading"
                >
                    Get OTP
                    <b-loading :is-full-page="false" :active.sync="isLoading" />
                </b-button>
            </form>
            <form ref="loginForm" class="log-in-form" v-else>
                <h2 class="text-center">Login with your OTP</h2>
                <b-field label="Phone Number">
                    <b-input v-model="form.phoneNumber"></b-input>
                </b-field>
                <b-field label="OTP">
                    <b-input v-model="form.otp"></b-input>
                </b-field>
                <b-button
                    type="is-primary"
                    @click.prevent="attemptLogin"
                    :disabled="isLoading"
                    >Login</b-button
                >
                <p class="text-center" @click.prevent="resendOtp">
                    <a href="#">Resend OTP</a>
                </p>
            </form>
        </div>
    </section>
</template>

<script>
import authService from '../service/auth';

export default {
    name: 'Login',
    components: {},
    data() {
        return {
            isLoading: false,
            otpForm: true,
            form: {
                phoneNumber: '',
                otp: ''
            }
        };
    },
    methods: {
        requestOtp() {
            this.isLoading = true;
            return authService
                .requestOtp(this.form.phoneNumber)
                .then(res => {
                    console.log(res);
                    this.isLoading = false;
                    this.otpForm = false;
                })
                .catch(() => {
                    this.isLoading = false;
                    this.$buefy.toast.open({
                        duration: 5000,
                        message: `Something's not right. Please try again later.`,
                        type: 'is-danger'
                    });
                });
        },
        attemptLogin() {
            return this.$auth.login({
                data: {
                    otp: this.form.otp,
                    identifier: this.form.phoneNumber
                }
            });
            // if (this.form.otp === '123456') {
            //     return this.$router.push('/dashboard');
            // } else {
            //     this.$buefy.toast.open({
            //         duration: 5000,
            //         message: `Incorrect OTP. Please try again.`,
            //         type: 'is-danger'
            //     });
            // }
        },
        resendOtp() {
            this.$buefy.toast.open({
                duration: 5000,
                message: `Please check your phone for an OTP.`,
                type: 'is-success'
            });
        }
    }
};
</script>
<style lang="scss" scoped></style>
