<template>
    <div v-if="loading">
        <Loader />
    </div>

    <v-row v-else>
        <v-col cols="12">
            <v-card class="mx-auto mb-5" style="padding: 2% !important;" outlined>
                <template v-for="contract in contracts" :key="content">
                    <h2 align="center" class="mb-5">{{ contract.title }}</h2>
                    <div v-html='contract.text' />
                </template>
            </v-card>
        </v-col>
    </v-row>

</template>

<script>
import api from '../api';
import Loader from "../components/Loader.vue";

export default {
    data: () => ({
        loading: false,
        contracts: [],
    }),
    mounted() {
        this.loading = true;
        const token = localStorage.getItem('loginToken');
        api.get('/api/get_contract_aboutus', null, token)
            .then((res) => {
                this.contracts.push({ title: res.data.data.contract.title, text: res.data.data.contract.content });
                this.loading = false;
            })
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
