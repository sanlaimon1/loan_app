<template>
    <h1>常见问题</h1>
    <br />
    <v-expansion-panels variant="accordion" style="margin-bottom: 15% !important;">
        <v-expansion-panel v-for="article in articles" :key="article.id" :title="article.title"
            :text="article.content"></v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        articles: [],
        panel: [0, 1],
        disabled: false,
        readonly: false,
    }),
    mounted() {
        /*const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}` }
        };*/
        axios.get('https://www.xmnongfu.com/api/articles', {
            method: 'HEAD',
            mode: 'no-cors'
        })
            .then(function (res) {
                // Handle success
                this.articles = res.data.data
            }.bind(this))
            .catch(error => {
                if (error.response) {
                    // Response has been received from the server
                    console.log(error.response.data);
                    // this.form.error.message = error.response.data.message
                }
            });
    },
}
</script>
