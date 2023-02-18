<template>
    <div>
        <v-progress-linear v-model="power" color="green" height="20" :model-value="progress"
            striped></v-progress-linear>
    </div>
</template>

<script>
export default {
    data: () => ({
        progress: 20
    }),
}
</script>

<style lang="scss" scoped>

</style>
