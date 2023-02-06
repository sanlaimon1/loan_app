<template>
    <div>
        <VueSignaturePad width="100%" height="350px" ref="signaturePad" class="" /><br/>
        <v-row>
            <v-col cols="12" md="6">
                撤销 <v-btn icon="mdi-cached" color="info" @click="undo"></v-btn>
            </v-col>

            <v-col cols="12" md="6" class="text-right">
                <v-btn size="large" color="success" @click="save">
                    保存
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'MySignaturePad',
    methods: {
        undo() {
            this.$refs.signaturePad.undoSignature();
        },
        save() {
            const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
            console.log(isEmpty);
            console.log(data);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
