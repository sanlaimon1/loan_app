<script setup>
import Loader from "../components/Loader.vue";
</script>
<template>
    <v-row no-gutters>
        <v-col md="3" sm="1" class="hidden-sm-and-down"></v-col>
        <v-col>
            <v-card>
                <v-card-title>
                    <h6 class="text-h6 text-center">注册</h6>
                </v-card-title>

                <!-- https://www.codermen.com/how-to-display-a-loader-while-sent-request-is-in-progress-in-vue/ -->
                <div v-if="form.loading">
                    <Loader />
                </div>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit" method="post">
                        <!-- <v-col cols="12">
                            <v-text-field v-model="form.username" :counter="10" :rules="nameRules"
                                label="名字"></v-text-field>
                            <div class="fill-height">
                                    <v-btn color="primary">
                                        发送验证码
                                    </v-btn>
                                </div>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field v-model="form.realname" :counter="10" :rules="nameRules"
                                label="真正的名字"></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field v-model="form.email" :counter="10" :rules="emailRules"
                                label="邮箱"></v-text-field>
                        </v-col> -->

                        <v-col cols="12">
                            <v-text-field v-model="form.username" :counter="11" :rules="phoneRules"
                                label="电话号码"></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field v-model="form.password" label="密码" type="password" :rules="passwordRules">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field v-model="form.password_confirmation" label="确认密码" type="password"
                                :rules="passwordRules"></v-text-field>
                        </v-col>

                        <!--<v-col cols="12">
                            <v-text-field v-model="form.withdraw_password" label="提現密碼" type="password"
                                :rules="passwordRules">
                            </v-text-field>
                        </v-col>-->

                        <v-col cols="12">
                            <span style="color: red">{{ form.error.message ? form.error.message : '' }}</span>
                            <v-btn block color="#f6655a" size="large" type="submit">
                                注册
                            </v-btn>
                        </v-col>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col md="3" sm="1" class="hidden-sm-and-down"></v-col>
    </v-row>
    <br />
</template>

<script>
import api from "../api";
import { router } from "../routes"

export default {
    data: () => ({
        valid: true,
        form: {
            username: '',
            realname: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            device: '',
            location: '',
            realname: '',
            wallet: 0.00,
            withdraw_password: "",
            ip: "",
            error: {},
            loading: false
        },
        nameRules: [
            v => !!v || '必填项'
        ],
        emailRules: [
            v => !!v || '必填项',
            v => /.+@.+\..+/.test(v) || '必须是合法的电子邮件',
        ],
        phoneRules: [
            v => !!v || '必填项',
            v => (v && v.length <= 11) || '添加正确的11位手机号',
        ],
        passwordRules: [
            v => !!v || '必填项',
            v => (v && v.length >= 4) || '密码不能小于4位',
        ]
    }),
    methods: {
        async submit() {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.form.loading = true;
                api.post('/api/register', this.form)
                    .then((res) => {
                        // Handle success
                        if (res.data.token !== '') {
                            console.log("registered successfully!!");
                            localStorage.setItem('loginToken', res.data.token);
                            localStorage.setItem('username', res.data.user.phone);
                            router.push('/profile');
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            // Response has been received from the server
                            console.log(error.response.data);
                            this.form.error.message = error.response.data.message;
                            this.form.loading = false;
                        }
                    });
            }
        }
    },
    mounted() {
        //https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
        var userAgent = navigator.userAgent || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            this.device = "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            this.device = "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            this.device = "iOS";
        }
        this.form.device = "computer";

        // fetch('https://api.ipify.org?format=json')
        //     .then(x => x.json())
        //     .then(({ ip }) => {
        //         this.form.ip = ip;
        //         console.log(this.form.ip);
        //     });
    }
}
</script>
