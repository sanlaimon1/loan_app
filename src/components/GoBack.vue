<template>
    <v-btn color="white" variant="text" class="mx-2" @click="goBack" style="width: 40px">
        <svg-icon type="mdi" :path="path" size="35"></svg-icon>
    </v-btn>
</template>

<script>
import { router } from "../routes";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronLeft } from '@mdi/js';

export default {
    data() {
        return {
            path: mdiChevronLeft,
        }
    },
    methods: {
        goBack() {
            router.go(-1)
        }
    },
    components: {
        SvgIcon
    },
}
</script>

<style lang="scss" scoped>

</style>
