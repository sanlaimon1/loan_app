<template>
    <div v-if="loading">
        <Loader />
    </div>
    <div v-else>
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto mb-5" style="padding: 2% !important;" outlined>
                    <template v-for="content in contents" :key="content">
                        <h2 align="center" class="mb-5">{{ content.title }}</h2>
                        <div v-html='content.text' />
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
//import GoBack from "../components/GoBack.vue";
import api from '../api';
import Loader from "../components/Loader.vue";

export default {
    data: () => ({
        loading: false,
        contents: [],
    }),
    mounted() {
        this.loading = true;
        const token = localStorage.getItem('loginToken');
        api.get("/api/get_contract_aboutus", null, token)
            .then((res) => {
                this.contents.push({ title: res.data.data.aboutus.title, text: res.data.data.aboutus.content })
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
        //GoBack
        Loader
    }
}
</script>

<style lang="scss" scoped>

</style>
