<script setup>
import ItemsGroup from '../components/ItemsGroup.vue';
</script>

<template>
    <v-row no-gutters>
        <v-col cols="12" class="no-bg-color">
            <v-sheet>
                <v-avatar class="eighty-h">
                    <v-icon icon="mdi-account-circle" style="font-size: 5em; "></v-icon>
                </v-avatar>
                <v-avatar class="eighty-h" style="width:auto">
                    <span id="username-hi">
                        <h4>{{ username }}</h4>
                        <h6>Hi</h6>
                    </span>
                </v-avatar>
            </v-sheet>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" sm="3">
            <v-card>
                <v-card-text class="lh-0">账户余额 (元)</v-card-text>
                <v-card-title class="text-xs-h6 text-md-h5 text-lg-h4">{{ accountBalance }}</v-card-title>
            </v-card>
        </v-col>
        <v-col cols="12" sm="3">
            <v-card>
                <v-card-text class="lh-0">最近借款 (元)</v-card-text>
                <v-card-title class="text-xs-h6 text-md-h5 text-lg-h4">{{ recentLoan }}</v-card-title>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <ItemsGroup />
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <router-link to="/login">
                <v-img :aspect-ratio="(16 / 9)" :width="800" src="assets/mypng.60f6d326.png" cover
                    class="mb-8vh"></v-img>
            </router-link>
        </v-col>
    </v-row>
</template>

<script>
import api from '../api';

export default {
    data: () => ({
        accountBalance: 0,
        recentLoan: 0,
        username: '',
    }),
    mounted() {
        const get_username = localStorage.getItem('username');
        this.username = get_username;
        const token = localStorage.getItem('loginToken');
        api.get('/api/ordersdata', null, token)
            .then((res) => {
                // Handle success
                this.accountBalance = res.data.data.wallet;
                this.recentLoan = res.data.data.amount;
            })
            .catch(error => {
                if (error.response) {
                    // Response has been received from the server
                    console.log(error.response.data);
                    // this.form.error.message = error.response.data.message
                }
            });
    }
}
</script>
