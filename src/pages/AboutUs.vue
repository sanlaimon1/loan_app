<template>
    <div>
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
import axios from 'axios';
export default {
    data: () => ({
        form: {},
        contents: [],
    }),
    mounted() {
        console.log("content", this.contents);
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("loginToken")}`, method: 'HEAD',
                mode: 'no-cors'
            }
        };
        axios.get("https://www.xmnongfu.com/api/get_contract_aboutus", config)
            .then(function (res) {
                // Handle success
                console.log(res.data.data.aboutus);
                this.contents.push({ title: res.data.data.aboutus.title, text: res.data.data.aboutus.content });
            }.bind(this))
            .catch(error => {
                if (error.response) {
                    // Response has been received from the server
                    this.form.error.message = error.response.data.message;
                }
            });
    },
    components: {
        //GoBack
    }
}
</script>

<style lang="scss" scoped>

</style>
