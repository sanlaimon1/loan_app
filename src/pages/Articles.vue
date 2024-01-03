<template>
    <h1>常见问题</h1>
    <br />
    <div v-if="loading">
        <Loader />
    </div>
    <v-expansion-panels variant="accordion" style="margin-bottom: 15% !important;">
        <v-expansion-panel v-for="article in articles" :key="article.id" :title="article.title"
            :text="article.content"></v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import api from '../api';
import Loader from "../components/Loader.vue";

export default {
    data: () => ({
        articles: [],
        panel: [0, 1],
        disabled: false,
        readonly: false,
        loading: false,
    }),
    mounted() {
        this.loading = true;        
        api.get('/api/articles')
            .then(res => {
                this.articles = res.data.data;
                this.loading = false;
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    this.loading = false;
                    // this.form.error.message = error.response.data.message
                }
            });
    },
    components: {
        Loader
    }
}
</script>
