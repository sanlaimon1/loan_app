<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto pb-5" style="" outlined>

                    <v-expansion-panels multiple>
                        <v-expansion-panel>
                            <v-expansion-panel-title>修改密码</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-form ref="form" v-model="valid" lazy-validation
                                    @submit.prevent="submit('change_password', false, 1)" enctype="multipart/form-data">
                                    <v-row>
                                        <v-col cols="12" style="padding: 0% !important; padding-top: 1% !important;">
                                            <v-text-field type="password" v-model="form.old_password" label="旧密码"
                                                aria-placeholder="新密码" :rules="nameRules">
                                            </v-text-field>
                                        </v-col>
                                        <span style="color: red">{{
                                            form.error.message ? form.error.message :
                                                ''
                                        }}</span>

                                        <v-col cols="12" style="padding: 0% !important;">
                                            <v-text-field type="password" v-model="form.new_password" label="新密码"
                                                aria-placeholder="新密码" :rules="nameRules">
                                            </v-text-field>
                                        </v-col>

                                        <v-btn block color="info" size="large" rounded type="submit">
                                            提交
                                        </v-btn>
                                    </v-row>
                                </v-form>
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                    </v-expansion-panels>

                    <v-row class="pt-5" style="padding-bottom: 30%;">
                        <v-col cols="12" md="6">
                            <span class="ml-5">版本信息</span>
                        </v-col>
                        <v-col cols="12" md="6" align="right">
                            <span class="mr-5">v2.13</span>
                        </v-col>
                    </v-row>

                    <div style="padding-left: 5%; padding-right: 5%;">
                        <v-btn block color="#f6655a" size="large" rounded @click="logout()">
                            退出登录
                        </v-btn>
                    </div>

                </v-card>

            </v-col>
        </v-row>
    </div>
</template>

<script>
import api from "../api";
import { router } from "../routes"
import Loader from "../components/Loader.vue";

export default {
    data: () => ({
        valid: true,
        form: {
            old_password: '',
            new_password: '',
            error: {},
        },
        nameRules: [
            v => !!v || '请填写旧密码'
        ],
    }),
    components: {
        Loader
    },
    methods: {
        async submit() {
            const { valid } = await this.$refs.form.validate();
            const token = localStorage.getItem('loginToken');
            let loanapplyObj = {};
            if (valid) {
                loanapplyObj.old_password = this.form.old_password;
                loanapplyObj.new_password = this.form.new_password;
                // console.log(loanapplyObj);
                this.form.loading = true;
                api.post('/api/change_password', this.form, token)
                    .then(function (res) {
                        // Handle success
                        // console.log(res);
                        this.form.isverified = res.data.message;
                        router.push('/login');
                        this.form.loading = false;
                    }.bind(this))
                    .catch(error => {
                        if (error.response) {
                            // Response has been received from the server
                            console.log(error.response.data.errors);
                            this.form.error.message = error.response.data.errors
                        }
                    });
            }
        },
        async logout() {
            localStorage.removeItem('loginToken');
            localStorage.removeItem('username');
            router.push('/');
        }
    },
    mounted() {

    }
}
</script>