<template>
    <div>
        <div class="app-body">
            <div class="container">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item org-details">
                            <div
                                class="has-text-black is-size-5 has-text-weight-semibold is-full-mobile"
                            >
                                {{ availableOrders | formatNumber }} vouchers
                                available
                            </div>
                            <div class="seperator"></div>
                            <div
                                class="has-text-black is-size-5 has-text-weight-semibold is-full-mobile"
                            >
                                {{ issuedOrders | formatNumber }} vouchers
                                issued
                            </div>
                            <!-- <div class="is-block has-text-black has-text-weight-semibold">
                                <div class="is-size-5">{{ org.name }}</div>
                            </div>-->
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <b-button
                                @click="openCreateRequest"
                                type="is-primary"
                                >Create Request</b-button
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <create-request
            @close="openCR = false"
            @success="onOrderSuccess"
            v-if="openCR"
        ></create-request>
    </div>
</template>

<script>
import CreateRequest from '../components/CreateRequest.vue';
// import EPassService from '../service/EPassService';
// import { showError } from '../utils/toast';

export default {
    name: 'Dashboard',
    components: {
        CreateRequest
    },
    data() {
        // let org = localStorage.getItem('org');
        // if (org) {
        //     org = JSON.parse(org);
        // }
        return {
            openCR: false,
            total: 100000,
            issued: 0
        };
    },

    computed: {
        totalOrders() {
            return this.total;
        },
        issuedOrders() {
            return this.issued;
        },
        availableOrders() {
            return this.total - this.issued;
        }
    },
    filters: {
        formatNumber(number) {
            return new Intl.NumberFormat('en-IN').format(number);
        }
    },
    methods: {
        openCreateRequest() {
            this.openCR = true;
        },
        // async fetchOrg() {
        //     try {
        //         const { data } = await EPassService.getOrganization();
        //         this.org = data;
        //         localStorage.setItem('org', JSON.stringify(data));
        //     } catch (error) {
        //         showError('Unable to fetch organization');
        //     }
        // },
        onOrderSuccess() {
            this.openCR = false;
            // this.$store.dispatch('fetchOrders');
            this.issued = this.issued + 5000;
        }
    },

    mounted() {
        // this.fetchOrg();
    }
};
</script>

<style lang="scss">
.app-body {
    padding: 40px;
    border-top: 1px solid #ededed;
    button {
        height: 40px;
        font-weight: 600;
    }
}

.no-request-image {
    text-align: center;
    padding: 80px 0;
    img {
        width: 50%;
        max-width: 480px;
    }
}

.org-details {
    .seperator {
        height: 3rem;
        width: 0;
        border: 2px solid #ededed;
        margin: 0 1rem;
    }
}

.toast {
    font-weight: 600;
}
</style>
