<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto mb-5" style="padding: 2% !important;" outlined>
                    <template v-for="contract in contracts" :key="content">
                        <h2 align="center" class="mb-5">{{ contract.title }}</h2>
                        <div v-html='contract.text' />
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import api from '../api';
export default {
    data: () => ({
        form: {

        },
        contracts: [],
    }),
    mounted() {
        const token = localStorage.getItem('loginToken');
        api.get('/api/get_contract_aboutus', null, token)
            .then((res) => {
                this.contracts.push({ title: res.data.data.contract.title, text: res.data.data.contract.content });
            })
            .catch(error => {
                if (error.response) {
                    // Response has been received from the server
                    this.form.error.message = error.response.data.message
                }
            });
    }
}
</script>

<style lang="scss" scoped>

</style>
