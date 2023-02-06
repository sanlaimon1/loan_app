<template>
    <v-btn color="black" variant="text" class="mx-2" @click="goBack">
        <v-icon color="#fff" start icon="mdi-arrow-left"></v-icon>
    </v-btn>
</template>

<script>
import { router } from "../routes";

export default {
    methods: {
        goBack() {
            router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
