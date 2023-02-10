<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto mb-5" style="padding: 2% !important;" outlined>
                    <h2 align="center" class="mb-5">我的还款</h2>
                    <v-table fixed-header>
                        <thead>
                            <tr>
                                <th class="text-center font-weight-bold border border-dark">
                                    还款金额
                                </th>
                                <th class="text-center font-weight-bold border border-dark">
                                    还款日期
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td colspan="2">
                                    <Loader/>
                                </td>
                            </tr>
                            <tr v-for="item in items" :key="item" v-else>
                                <td class="text-center border border-dark">{{ item.repayment }}</td>
                                <td class="text-center border border-dark">{{ item.repayment_date }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import api from '../api';
import Loader from "../components/Loader.vue";

export default {
    data: () => ({
        loading: true,
        items: [],
    }),
    methods: {
        return_date(date, except) {
            var getexcept = except + 1;
            var dt = new Date(date);
            var test = new Date(dt.setMonth(dt.getMonth() + getexcept));
            var tempDate = new Date(test);
            return [tempDate.getDate(), tempDate.getMonth() + 1, tempDate.getFullYear()].join('-');
        }
    },
    mounted() {
        this.loading = true;
        const token = localStorage.getItem('loginToken');
        api.get('/api/orders', null, token)
            .then(function (res) {
                // Handle success
                for (var i = 0; i < res.data.data.except; i++) {
                    this.items.push({ repayment: res.data.data.return_money, repayment_date: this.return_date(res.data.data.created_at, i) });
                }
                this.loading = false;
            }.bind(this))
            .catch(error => {
                if (error.response) {
                    // Response has been received from the server
                    this.form.error.message = error.response.data.message;
                    this.loading = false;
                }
            });
    },
    components: {
        Loader
    }
}
</script>

<style lang="scss" scoped>

</style>
