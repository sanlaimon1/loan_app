<template>
    <h1>常见问题</h1>
    <br />
    <v-expansion-panels variant="accordion" style="margin-bottom: 15% !important;">
        <v-expansion-panel v-for="article in articles" :key="article.id" :title="article.title"
            :text="article.content"></v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import api from '../api';
export default {
    data: () => ({
        articles: [],
        panel: [0, 1],
        disabled: false,
        readonly: false,
    }),
    mounted() {
        api.get('/api/articles')
            .then(res => this.articles = res.data.data)
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    // this.form.error.message = error.response.data.message
                }
            });
    },
}
</script>
