<template>
    <div>
        <div class="app-body">
            <div class="container">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item org-details" v-if="this.org">
                            <div
                                class="has-text-black is-size-5 has-text-weight-semibold is-full-mobile"
                            >
                                {{
                                    (org.total_vouchers - org.used_vouchers)
                                        | formatNumber
                                }}
                                vouchers available
                            </div>
                            <div class="seperator"></div>
                            <div
                                class="has-text-black is-size-5 has-text-weight-semibold is-full-mobile"
                            >
                                {{ org.used_vouchers | formatNumber }} vouchers
                                issued
                            </div>
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
import organizationService from '../service/organization';
import { showError } from '../utils/toast';

export default {
    name: 'Dashboard',
    components: {
        CreateRequest
    },
    data() {
        let org = localStorage.getItem('org');
        if (org) {
            org = JSON.parse(org);
        }
        return {
            fetching: true,
            isValid: false,
            fetchError: false,
            redeeming: false,
            loader: null,
            org: org,
            openCR: false
        };
    },

    computed: {
        totalOrders() {
            return this.org.total_vouchers;
        },
        issuedOrders() {
            return this.org.used_vouchers;
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
        fetchOrg() {
            return organizationService(this)
                .fetchOrganization()
                .then(res => {
                    this.fetching = false;
                    this.loader.close();
                    this.isValid = true;
                    this.org = res.data;
                    localStorage.setItem('org', JSON.stringify(res.data));
                })
                .catch(() => {
                    this.loader.close();
                    this.fetching = false;
                    this.fetchError = true;
                    showError('Unable to fetch organization');
                });
        },
        onOrderSuccess() {
            this.openCR = false;
            this.fetchOrg();
        }
    },

    mounted() {
        this.loader = this.$buefy.loading.open();
        this.fetchOrg();
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
