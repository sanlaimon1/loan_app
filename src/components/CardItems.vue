<script setup>
// import Button from '../components/Button.vue'
</script>
<template>
    <!-- <v-card-item title="" class="pd-26"> -->
    <v-container class="fill-height bg-white br-8">
        <v-row>
            <v-col cols="12"><v-card-title class="text-h6 bg-white">
                    APP专享福利
                </v-card-title></v-col>
            <v-col cols="6">
                <v-card class="br-22">
                    <router-link to="/login">
                        <v-img src="assets/first.png" max-height="280" class="grey darken-4"></v-img>
                    </router-link>
                </v-card>
            </v-col>

            <v-col cols="6">
                <v-card class="br-22">
                    <router-link to="/login">
                        <v-img src="assets/second.png" max-height="280" contain class="grey darken-4"></v-img>
                    </router-link>
                </v-card>
            </v-col>

            <v-col cols="6">
                <v-card class="br-22">
                    <router-link to="/login">
                        <v-img src="assets/third.png" max-height="280" class="grey darken-4"></v-img>
                    </router-link>
                </v-card>
            </v-col>

            <v-col cols="6" class="br-22">
                <v-card class="br-22">
                    <router-link to="/login">
                        <v-img src="assets/fourth.png" max-height="280" contain class="grey darken-4"></v-img>
                    </router-link>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
