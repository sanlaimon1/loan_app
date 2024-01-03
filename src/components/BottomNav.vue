<template>
    <v-app>
        <v-bottom-navigation>
            <router-link to="/">
                <v-btn value="home" class="bottomnav">
                    <v-icon>mdi-home-outline</v-icon>
                    首页
                </v-btn>
            </router-link>

            <router-link to="/bill">
                <v-btn value="bill" class="bottomnav">
                    <v-icon>mdi-heart-outline</v-icon>
                    账单
                </v-btn>
            </router-link>

            <a :href="serviceUrl">
                <v-btn value="customer-support" class="bottomnav">
                    <v-icon>mdi-headset</v-icon>
                    客服
                </v-btn>
            </a>

            <router-link to="/profile-settings">
                <v-btn value="account" class="bottomnav">
                    <v-icon>mdi-account-multiple-outline</v-icon>
                    我的
                </v-btn>
            </router-link>

        </v-bottom-navigation>
    </v-app>
</template>
<script>
export default {
    data: () => ({
        serviceUrl: ''
    }),
    async mounted(){
        this.serviceUrl = localStorage.getItem('serviceUrl')
    }
}
</script>
<style  scoped>
a {
    text-decoration: none;
}
</style>
