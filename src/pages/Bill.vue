<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto pa-4" outlined>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="text-h5 mb-1 text-center">
                                我的贷款
                            </v-list-item-title>
                            <div class="mb-1 text-h7">
                                借款编号: {{ form.orderno }}
                            </div>

                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-list-item-title class="text-h5 mb-1">
                                        {{ form.except }} 月
                                    </v-list-item-title>
                                </template>
                                <template v-slot:append>
                                    <v-list-item-title class="text-h5 mb-1 text-center">
                                        ¥ {{ form.amount }}
                                    </v-list-item-title>
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-list-item-subtitle>借款时间</v-list-item-subtitle>
                                </template>
                                <template v-slot:append>
                                    <v-list-item-subtitle>贷款额度</v-list-item-subtitle>
                                </template>
                            </v-list-item>


                            <v-btn variant="flat" color="error" style="float: right;margin-right: 14px;"
                                @click="contract">
                                查看合同
                            </v-btn>


                            <v-alert v-if="form.amount > 0" variant="text" style="color: red">
                                {{ form.title }}
                            </v-alert>
                        </v-list-item-content>

                        <div v-if="form.amount > 0" style="min-width: 250px;">
                            <v-divider></v-divider><br />
                            <v-list-item-title class="text-h5 mb-1">
                                订单详情:
                            </v-list-item-title>
                            <v-list-item-subtitle>{{ form.content }}</v-list-item-subtitle>
                        </div>
                        <v-alert v-else icon="mdi-cloud-alert" title="您还没有提交贷款" type="error" variant="text"
                            style="min-width: 250px;">
                        </v-alert>

                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </div>
    <br /><br /><br />
</template>

<script>
import { router } from '../routes';
import axios from 'axios';
export default {
    data: () => ({
        form: {
            amount: 0,
            except: '',
            orderno: '',
            status: '',
            title: '',
            content: '',
            return_money: '',
            error: {},
        },
    }),
    mounted() {
        if (localStorage.getItem('loginToken') == null) {
            router.push('/login');
        } else {
            //do new api call for bill apge
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('loginToken')}`, method: 'HEAD',
                    mode: 'no-cors'
                }
            };
            axios.get('https://www.xmnongfu.com/api/orders', config)
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
                        console.log(error.response.data);
                        this.form.error.message = error.response.data.message
                    }
                });
        }
    },
    methods: {
        contract() {
            router.push('/contract');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
