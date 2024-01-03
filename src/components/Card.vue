<script setup>
import Button from './Button.vue'
import Loader from "../components/Loader.vue";
</script>
<template>
    <v-card class="mx-auto">
        <v-card-item>
            <template v-slot:subtitle>
                最高借款额度 (元)
            </template>
        </v-card-item>

        <v-card-text class="py-0">
            <v-row align="center" no-gutters>
                <v-col class="text-h2" cols="10.5">
                    300000
                </v-col>

                <div v-if="loading">
                    <Loader />
                </div>

                <div class="d-flex justify-center align-baseline" style="gap: 1rem">
                    <!-- <v-btn :loading="loading[1]" :disabled="loading[1]" color="#f6655a" @click="load(1)"> -->
                    <v-btn color="#f6655a" @click="checkauthToOrder">
                        <span style="color:#fff">立即借款</span>
                    </v-btn>
                </div>
            </v-row>
        </v-card-text>

        <v-card-item>
            <template v-slot:subtitle>
                最低利率 0.02% (年化利率 0.73% )
            </template>
        </v-card-item>
    </v-card>
</template>
<script>
import { router } from "../routes"
import api from '../api';

export default {
    data: () => ({
        loading: false,
        verifiedStatus: ''
    }),
    methods: {
        checkauthToOrder() {
            const token = localStorage.getItem('loginToken');
            this.loading = true;
            if (token !== null) {
                api.get('/api/customer_verified', null, token)
                    .then((res) => {
                        this.verifiedStatus = res.data.data.message || res.data.data.attribute.message;
                        // Handle success
                        if(this.verifiedStatus == "已验证"){
                            if(status ==1){
                                router.push('/apply-loan-confirm');
                            }else {
                                router.push('/profile');
                            }
                        }else{
                            router.push('/apply-loan');
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            // Response has been received from the server
                            console.log(error.response.data);
                            this.form.error.message = error.response.data.message;
                            this.loading = false;
                        }
                    });
            } else {
                router.push('/login')
            }
        },
    }
}
</script>
