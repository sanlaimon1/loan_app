<script setup>
import Loader from "../components/Loader.vue";
</script>
<template>
    <v-row no-gutters>
        <v-col md="3" sm="1" class="hidden-sm-and-down"></v-col>
        <v-col>
            <v-card>
                <v-card-title>
                    <h6 class="text-h6 text-center">登录</h6>
                </v-card-title>

                <!-- https://www.codermen.com/how-to-display-a-loader-while-sent-request-is-in-progress-in-vue/ -->
                <div v-if="form.loading">
                    <Loader />
                </div>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit" method="post">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="number" v-model="form.phone" :rules="phoneRules" label="电话号码">
                                </v-text-field>
                                <!-- <div class="fill-height">
                                    <v-btn color="primary">
                                        发送验证码
                                    </v-btn>
                                </div> -->
                            </v-col>

                            <v-col cols="12">
                                <v-text-field type="password" v-model="form.password" :rules="passwordRules" label="密码">
                                </v-text-field>
                                <span style="color: red">{{ form.error.message ? form.error.message : '' }}</span>
                                <br />
                                <v-btn block color="#f6655a" size="large" type="submit">
                                    登录
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col md="3" sm="1" class="hidden-sm-and-down"></v-col>
    </v-row>
</template>

<script>
import api from "../api";
import { router } from "../routes"
import axios from "axios";

export default {
    data: () => ({
        valid: true,
        form: {
            phone: '',
            email: '',
            password: '',
            error: {},
            loading: false
        },
        phoneRules: [
            v => !!v || '必填项',
            v => (v && v.length <= 11) || '请输入11位手机号码',
        ],
        emailRules: [
            v => !!v || '必填项',
            v => /.+@.+\..+/.test(v) || 'E-mail需要合法的格式',
        ],
        passwordRules: [
            v => !!v || '必填项',
            v => (v && v.length >= 4) || '长度最少4位',
        ]
    }),
    methods: {
        async submit() {
            console.log("login hit");
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                this.form.loading = true;
                api.post('/api/login', this.form)
                //axios.post('http://api.cybdzw.com/api/login', this.form)
                    .then((res) => {
                        // Handle success
                        console.log(">//", res.data);
                        if (res.data.token !== '') {
                            localStorage.setItem('loginToken', res.data.token);
                            localStorage.setItem('username', res.data.customer.phone);
                            // router.push('/')
                            this.$router
                                .push({ path: '/' })
                                .then(() => { this.$router.go() })
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            // Response has been received from the server
                            this.form.error.message = error.response.data.message;
                            this.form.loading = false;
                        }
                    });
            }
        },

    }
}
</script>
