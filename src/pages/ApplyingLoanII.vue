<template>
    <!-- <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit" method="post"> -->
    <div class="text-caption pa-6 bg-white text-center br-8">
        <div class="text-grey text-h6">借款金额 (元)</div>
        <div :class="['text-h3', 'pa-2', 'text-center', 'font-weight-large', 'font-weight-bold']">
            <h4>{{ form.amount && parseFloat(form.amount).toFixed(0) }}</h4>
        </div>

        <v-row no-gutters>
            <v-col md="2" sm="1">
                <div :class="['text-h6', 'pa-2', 'text-center', 'font-weight-large', 'font-weight-bold']">
                    {{ form.amount && parseFloat(form.amount).toFixed(0) }}
                </div>
                <div class="text-grey text-body-2">到账金额(元)</div>
            </v-col>
            <v-col>
                <div :class="['text-h6', 'pa-2', 'text-center', 'font-weight-large', 'font-weight-bold']">
                    {{ parseFloat(form.return_money).toFixed(2) }}
                </div>
                <div class="text-grey text-body-2">每期还款(元)</div>
            </v-col>
            <v-col md="2" sm="1">
                <div :class="['text-h6', 'pa-2', 'text-center', 'font-weight-large', 'font-weight-bold']">{{
                    form.except
                }}</div>
                <div class="text-grey text-body-2">借款期限(个月)</div>
            </v-col>
        </v-row>
    </div>

    <div class="text-caption pa-6 bg-white text-center mgt-10 br-8">
        <v-row no-gutters>
            {{ min }}<v-slider v-model="form.amount" :value="form.amount" class="align-center" :max="max" :min="min"
                color="green" @mousemove="returnPayment" :step="10000" tick-size="2" :lazy="true">
            </v-slider>{{ max }}
        </v-row>
        &nbsp;<div class="text-grey text-body-2 text-center cus-mgr-pd">拖动调整额度</div>
    </div>

    <div class="text-caption pa-6 bg-white mgt-10 br-8 mgb-44">
        <div class="text-grey text-body-2">期限</div>
        <v-radio-group v-model="form.except" @change="returnPayment">
            <v-row justify="space-around">
                <v-col class="push-to-center">
                    <v-radio label="3个月" value="3"></v-radio>
                </v-col>
                <v-col class="push-to-center">
                    <v-radio label="6个月" value="6"></v-radio>
                </v-col>
                <v-col class="push-to-center">
                    <v-radio label="12个月" value="12"></v-radio>
                </v-col>
            </v-row>
            <v-row justify="space-around">
                <v-col class="push-to-center">
                    <v-radio label="18个月" value="18"></v-radio>
                </v-col>
                <v-col class="push-to-center">
                    <v-radio label="24个月" value="24"></v-radio>
                </v-col>
                <v-col class="push-to-center">
                    <v-radio label="36个月" value="36"></v-radio>
                </v-col>
            </v-row>
        </v-radio-group>
    </div>

    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-card style="margin-bottom: 40px;">
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>核对订单</v-toolbar-title>
            </v-toolbar>

            <v-list lines="two">
                <v-list-item>
                    <template v-slot:prepend>
                        借款金额
                    </template>

                    <template v-slot:append>
                        {{ parseFloat(form.amount).toFixed(0) }}
                    </template>
                </v-list-item>
                <v-list-item>
                    <template v-slot:prepend>
                        还款金额
                    </template>

                    <template v-slot:append>
                        {{ parseFloat(form.return_money).toFixed(0) }}
                    </template>
                </v-list-item>
                <v-list-item>
                    <template v-slot:prepend>
                        借款期限
                    </template>

                    <template v-slot:append>
                        {{ form.except }}
                    </template>
                </v-list-item>

                <v-list-item>
                    <template v-slot:prepend>
                        收款银行
                    </template>

                    <template v-slot:append>
                        {{ form.bank_name }}
                    </template>
                </v-list-item>

                <v-list-item>
                    <template v-slot:prepend>
                        收款卡号
                    </template>

                    <template v-slot:append>
                        {{ form.bank_card_number }}
                    </template>
                </v-list-item>
            </v-list>
            <br />
            <div>
                <div v-if="loading">
                    <Loader />
                </div>
                <v-btn block color="#f6655a" size="large" @click="loanConfirm">
                    确认提交
                </v-btn>
            </div>
        </v-card>
        <br />
        <template v-slot:activator="{ props }">
            <v-btn block color="#f6655a" size="large" dark v-bind="props"
                :disabled="this.form.amount > this.max || this.form.amount <= 0 ? true : false">
                立即申请
            </v-btn>
        </template>
    </v-dialog>

    <!-- </v-form> -->
    <br /><br /><br />
</template>

<script>
import api from "../api";
import { router } from "../routes"
import Loader from "../components/Loader.vue";
// import {computed} from "vue";

export default {
    data: () => ({
        min: 30000,
        max: 300000,
        form: {
            amount: 30000,
            except: '' + 3,
            bank_name: 'Bank Of China',
            bank_card_number: '021548541048421',
            error: {},
            orderno: '',
            status: '',
            title: '',
            content: '',
            return_money: 0,
            loanStatus: '',
            isdisabled: true
        },
        loading: false,
        nameRules: [
            v => !!v || '必填项'
        ],
        dialog: false,
        show1: false,
        show2: true,
    }),
    methods: {
        async loanConfirm() {
            this.loading = true;
            const token = localStorage.getItem('loginToken');
            api.post('/api/orders', this.form, token)
                .then(function (res) {
                    //Handle success
                    router.push('/bill')
                }.bind(this))
                .catch(error => {
                    if (error.response) {
                        // Response has been received from the server
                        this.form.error.message = error.response.data.message
                    }
                });
        },
        // returnPayment() {
        //     this.form.return_money = computed(() => (this.form.amount.toFixed(2) / this.form.except) + (this.form.amount.toFixed(2) * 0.06));
        // },
        checkLoanApplyStatus() {
            const token = localStorage.getItem('loginToken');
            api.get('/api/orders', null, token)
                .then(function (res) {
                    // Handle success
                    this.form.title = res.data.data.title;
                    this.form.amount = res.data.data.amount;
                    this.form.except = res.data.data.except;
                    this.form.orderno = res.data.data.orderno;
                    this.form.status = res.data.data.status;
                    this.form.content = res.data.data.content;
                }.bind(this))
                .catch(error => {
                    if (error.response) {
                        // Response has been received from the server
                        this.form.error.message = error.response.data.message
                    }
                });
        },
    },
    async mounted() {
        //this.returnPayment();
        const token = localStorage.getItem('loginToken');
        api.get('/api/get_customer_bank', null, token)
            .then((res) => {
                // Handle success
                this.form.bank_name = res.data.data.attribute.bank_name;
                this.form.bank_card_number = res.data.data.attribute.bank_card;
            })
            .catch(error => {
                if (error.response) {
                    this.form.error.message = error.response.data.message
                }
            });
    },
    computed: {
        returnPayment() {
            this.form.return_money = (this.form.amount.toFixed(2) / this.form.except) + (this.form.amount.toFixed(2) * 0.06);
        },
    }
}
</script>

<style scoped>
.v-text-field input {
    font-size: 2.6em;
    text-align: center;
}
</style>
