<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto mb-5" outlined>
                    <v-list style="background-color: #f9a8d4 !important;">
                        <v-list-item>
                            <template v-slot:prepend>
                                订单编号
                            </template>
                            <template v-slot:append>
                                {{ form.order_number }}
                            </template>
                        </v-list-item>
                        <v-list-item>
                            <template v-slot:prepend>
                                借款金额
                            </template>
                            <template v-slot:append>
                                {{ form.loan_amount }}元
                            </template>
                        </v-list-item>
                        <v-list-item>
                            <template v-slot:prepend>
                                总计
                            </template>
                            <template v-slot:append>
                                {{ form.total }}期
                            </template>
                        </v-list-item>
                        <v-list-item>
                            <template v-slot:prepend>
                                订单编号
                            </template>
                            <template v-slot:append>
                                {{ form.monthly_repayment }}元
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card>

                <v-card class="mx-auto mb-5" style="background-color: #fee2e2!important;">
                    <v-data-table :items="desserts">
                        <tr v-for="item in items" :key="item">
                            <td>{{ item.issue }}</td>
                            <td>{{ item.repayment }}</td>
                            <td>{{ item.outstanding }}</td>
                        </tr>
                    </v-data-table>
                </v-card>

            </v-col>
        </v-row>
    </div>
</template>

<script>
import { router } from '../routes';
import api from '../api';
export default {
    data: () => ({
        form: {
            order_number: '',
            loan_amount: '',
            total: '',
            monthly_repayment: '',
        },
        items: [],
    }),
    mounted() {
        const token = localStorage.getItem('loginToken');
        api.get('/api/orders', null, token)
            .then(function (res) {
                // Handle success
                this.form.order_number = res.data.data.orderno;
                this.form.loan_amount = res.data.data.amount;
                this.form.total = res.data.data.except;
                this.form.monthly_repayment = res.data.data.return_money;
                for (var i = 0; i < res.data.data.except; i++) {
                    this.items.push({ issue: "第" + (i + 1) + "期", repayment: res.data.data.return_money, outstanding: "未还款" });
                }
            }.bind(this))
            .catch(error => {
                if (error.response) {
                    // Response has been received from the server
                    this.form.error.message = error.response.data.message
                }
            });
    }
}
</script>

<style>
tr {
    width: 100% !important;
}

td {
    width: 50% !important;
    padding: 10px;
}

td:first-child {
    width: 50% !important;
    padding: 10px;
}

td:last-child {
    width: 50% !important;
    padding: 10px;
}
</style>
