<template>
    <v-alert v-if="alertToogle == 'success'" :value="alertToogle == 'success' ? true : false" closable
        close-label="Close Alert" type="success">
        {{ form.success }}
    </v-alert>

    <v-alert v-if="alertToogle == 'error'" :value="alertToogle == 'error' ? true : false" closable
        close-label="Close Alert" type="error">
        {{ form.error }}
    </v-alert>


    <v-card style=" margin-bottom: 15%;">
        <v-container>

            <v-row>
                <v-col cols="12" sm="12" md="12">
                    <h3 style="text-align: center;color: #000;">我的资产 (元)</h3>
                    <h1 style="text-align: center;color:#000;">{{ form.assets_amount }}</h1>
                </v-col>
            </v-row>

            <h2>{{ form.isverified }}</h2>
            <div v-if="form.loading">
                <Loader />
            </div>

            <v-list>
                <v-list-item align="left">
                    <template v-slot:prepend>
                        我的借款 (元)
                    </template>

                    <template v-slot:append>
                        可提现额度 (元)
                    </template>
                </v-list-item>
                <v-list-item>
                    <template v-slot:prepend>
                        {{ form.loan_amount }}
                    </template>

                    <template v-slot:append>
                        {{ form.withdraw_amount }}
                    </template>
                </v-list-item>

                <v-btn block color="#f6655a" size="large" v-if="form.status == 37 || form.status == 34"
                    @click="sendWithdraw" rounded style="margin-bottom: 20px;">
                    立即提现
                </v-btn>
                <v-btn block color="#f6655a" size="large" v-else @click="noWithdraw" rounded
                    style="margin-bottom: 20px;">
                    立即提现
                </v-btn>
                <v-btn block color="#ffffff" size="large" @click="fundingDetails" rounded
                    style="border: 1px solid #f6655a;">
                    资金明细
                </v-btn><br>
            </v-list>

            <!-- <v-row>
                <v-col cols="12" md="6">
                    <h2>
                        <v-icon size="large" class="mdi-credit-card">credit_card</v-icon>
                        银行卡
                    </h2>
                </v-col>
            </v-row>

            <v-list>
                <v-list-item>
                    <template v-slot:prepend>
                        姓名
                    </template>

                    <template v-slot:append>
                        {{ form.bank_name }}
                    </template>
                </v-list-item>
                <v-list-item>
                    <template v-slot:prepend>
                        卡号
                    </template>

                    <template v-slot:append>
                        {{ form.bank_card_number }}
                    </template>
                </v-list-item>
            </v-list> -->

            <v-row style="text-align:center;">
                <v-col cols="12" style="padding-bottom:0; color: black;">
                    <span>
                        <v-icon size="small" class="mdi-information" style="color: red;">information</v-icon>
                        账户资金安全由银行保护
                    </span>
                </v-col>
                <v-col cols="12" style="padding-top:0; color: black;">
                    <span>
                        <v-icon size="small" class="mdi-help-circle" style="color: red;">help_circle</v-icon>
                        如有延迟到账请联系在线客服
                    </span>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import axios from 'axios';
import { router } from "../routes"
import Loader from "../components/Loader.vue";

export default {
    data: () => ({
        form: {
            assets_amount: '',
            loan_amount: '',
            withdraw_amount: '',
            bank_card_number: '',
            bank_name: '',
            order_id: '',
            success: '',
            error: '',
            status: '',
        },
        alertToogle: '',
    }),
    components: {
        Loader
    },
    methods: {
        async sendWithdraw() {
            this.loading = true;
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}`, method: 'HEAD',
                mode: 'no-cors' }
            };
            console.log(this.form.order_id);
            axios.get(`https://www.xmnongfu.com/api/withdraw_order/` + this.form.order_id, config)
                .then(function (res) {
                    //Handle success
                    console.log(res.data.message)
                    this.form.success = '提现成功'
                    this.alertToogle = 'success';
                    setTimeout(() => {
                        this.alertToogle = '';
                    }, 1000)

                }.bind(this))
                .catch(error => {
                    if (error.response) {
                        // Response has been received from the server
                        console.log(error.response.data);
                        this.form.error = error.response.data.message
                        this.alertToogle = 'error';
                        setTimeout(() => {
                            this.alertToogle = '';
                        }, 1000)
                    }
                });
        },
        async noWithdraw() {
            this.form.error = "余额不足"
            this.alertToogle = 'error';
            setTimeout(() => {
                this.alertToogle = '';
            }, 1000)
        },
        async fundingDetails() {
            router.push('/fundingDetails');
        }
    },
    async mounted() {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('loginToken')}`, method: 'HEAD',
                mode: 'no-cors'
            }
        };
        axios.get('https://www.xmnongfu.com/api/orders', config)
            .then(function (res) {
                // Handle success
                console.log(res.data.data);
                this.form.bank_card_number = res.data.data.bank_card;
                this.form.bank_name = res.data.data.bank_name;
                this.form.assets_amount = res.data.data.wallet;
                this.form.loan_amount = res.data.data.amount;
                this.form.withdraw_amount = res.data.data.wallet;
                this.form.order_id = res.data.data.id;
                this.form.status = res.data.data.status;
            }.bind(this))
            .catch(error => {
                if (error.response) {
                    // Response has been received from the server
                    console.log(error.response.data);
                    this.form.error.message = error.response.data.message
                }
            });
    }
}
</script>
