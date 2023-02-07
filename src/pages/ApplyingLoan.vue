<template>
    <v-card class="bg-border-none no-boxshadow">
        <v-row no-gutters>
            <v-col cols="12" class="no-bg-color">
                <v-sheet>
                    <v-avatar class="eighty-h">
                        <v-icon icon="mdi-account-circle" style="font-size: 5em; "></v-icon>
                    </v-avatar>
                    <v-avatar class="eighty-h" style="width:auto">
                        <span>
                            <h4>{{ username }}</h4>
                            <h6>Hi</h6>
                        </span>
                    </v-avatar>
                </v-sheet>
            </v-col>
        </v-row>

        <v-card-title>
            <span class="text-h5">个人信息</span>
        </v-card-title>

        <v-card-title>
            <span class="text-h5">{{ form.isverified }}</span>
        </v-card-title>
        <!-- https://www.codermen.com/how-to-display-a-loader-while-sent-request-is-in-progress-in-vue/ -->
        <div v-if="loading">
            <Loader />
        </div>
        <v-card>
            <v-tabs v-model="tab" bg-color="primary" update:tab2Disabled fixed-tabs>
                <v-tab v-for="item in items" :key="item" :value="item.value" :disabled="item.disabled">
                    {{ item.text }}
                </v-tab>
            </v-tabs>

            <v-window v-model="tab">
                <v-window-item value="verify" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation
                        @submit.prevent="submit('contactMember', false, 1)" enctype="multipart/form-data">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field type="text" v-model="form.id_name" :rules="nameRules" label="身份证姓名">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field type="text" v-model="form.id_number" :rules="nameRules" label="身份证号">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-file-input v-model="form.idfrontSide" :rules="fileSizeRules" label="请上传身份证正面"
                                    accept="image/*"></v-file-input>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-file-input v-model="form.idbackSide" :rules="fileSizeRules" label="请上传身份证背面"
                                    accept="image/*"></v-file-input>
                            </v-col>

                            <span style="color: red;display: block;padding: 10px 40px;">{{
                                form.error.message ?
                                    form.error.message : ''
                            }}</span>
                            <v-btn block color="#f6655a" size="large" type="submit"
                                :disabled="form.isverified == '已验证' ? true : false">
                                下一步
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-window-item>

                <v-window-item value="contactMember" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('cardInfo', false, 2)">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field type="text" v-model="form.contactperson1" :rules="nameRules"
                                    label="联系人姓名">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field type="number" v-model="form.phone1" :rules="nameRules" label="联系人电话">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field type="text" v-model="form.contactperson2" label="联系人姓名">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field type="number" v-model="form.phone2" label="联系人电话">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field type="text" v-model="form.id_name" label="身份证姓名">
                                </v-text-field>
                            </v-col>

                            <span style="color: red;display: block;padding: 10px 40px;">{{
                                form.error.message ?
                                    form.error.message : ''
                            }}</span>
                            <v-btn block color="#f6655a" size="large" type="submit"
                                :disabled="form.isverified == '已验证' ? true : false">
                                下一步
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-window-item>

                <v-window-item value="cardInfo" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('signature', false, 3)">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="text" v-model="form.bank_name" label="银行名称" :rules="nameRules">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field type="number" v-model="form.bank_card" label="卡号" :rules="nameRules">
                                </v-text-field>
                                <span style="color: red;display: block;padding: 10px 40px;">{{
                                    form.error.message ?
                                        form.error.message : ''
                                }}</span>
                            </v-col>

                            <v-btn block color="#f6655a" size="large" type="submit"
                                :disabled="form.isverified == '已验证' ? true : false">
                                下一步
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-window-item>

                <v-window-item value="signature" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('remark', false, 4)">
                        <v-alert close-label="Close Alert" type="success" :value="form.signature_alert"
                            v-if="form.signature_alert">
                            {{ form.signature_success }}
                        </v-alert>
                        <v-alert close-label="Close Alert" type="warning" :value="form.signature_alert"
                            v-if="form.signature_alert_warning">
                            {{ form.signature_success }}
                        </v-alert>

                        <VueSignaturePad id="signature" width="100%" height="200px" ref="signaturePad"
                            :options="{ onBegin: () => { $refs.signaturePad.resizeCanvas() } }"
                            v-model="form.signature" />
                        <v-row>
                            <v-col cols="6" md="6">
                                撤销 <v-btn icon="mdi-cached" color="info" @click="undo"></v-btn>
                            </v-col>

                            <v-col cols="6" md="6" class="text-right">
                                <v-btn size="large" color="success" @click="save">
                                    保存
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-btn block color="#f6655a" size="large" type="submit"
                            :disabled="form.isverified == '已验证' ? true : false">
                            下一步
                        </v-btn>
                    </v-form>
                </v-window-item>

                <v-window-item value="remark" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('remark', false, 4)"
                        method="post">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="text" v-model="form.remark" label="用途" :rules="nameRules">
                                </v-text-field>
                            </v-col>
                            <span style="color: red;display: block;padding: 10px 40px;">{{
                                form.error.message ?
                                    form.error.message : ''
                            }}</span>

                            <v-btn block color="#f6655a" size="large" type="submit"
                                :disabled="form.isverified == '已验证' ? true : false">
                                申请贷款
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-window-item>
            </v-window>
        </v-card>
    </v-card>
</template>

<script>
import { router } from "../routes"
import Loader from "../components/Loader.vue";
import api from "../api";

export default {
    data: () => ({
        loading: false,
        // valid: true,
        form: {
            id_name: '',
            id_number: '',
            idfrontSide: '',
            idbackSide: '',
            contactperson1: '',
            phone1: '',
            contactperson2: '',
            phone2: '',
            bank_name: '',
            bank_card: '',
            remark: '',
            signature: undefined,
            error: {},
            isverified: '',
            signature_success: '',
            signature_alert: false,
            signature_alert_warning: false,
            isEmpty: true
        },
        nameRules: [
            v => !!v || '必填项'
        ],
        phoneRules: [
            v => !!v || '必填项',
            v => (v && v.length <= 11) || '添加11位手机号码',
        ],
        emailRules: [
            v => !!v || '必填项',
            v => /.+@.+\..+/.test(v) || 'E-mail必须合法的格式',
        ],
        passwordRules: [
            v => !!v || '必填项',
            v => (v && v.length >= 4) || '长度最少4位',
        ],
        fileSizeRules: [
            v => !!v || '必填项',
            // v => (v && v[0].size > 3 * 1024 * 1024) && '上传文件不能大于3M'
            v => !v || !v.some(file => file.size > 3e6) || '上传文件不能大于3M'
            // files => !files || !files.some(file => file.size > 2_097_152) || 'Avatar size should be less than 2 MB!'
        ],
        tab: null,
        items: [
            { value: "verify", text: "验证", disabled: false }, { value: "contactMember", text: "联系人", disabled: true },
            { value: "cardInfo", text: "银行卡信息", disabled: true }, { value: "signature", text: "签名", disabled: true },
            { value: "remark", text: "用途", disabled: true }
        ],
        username: '',
    }),
    methods: {
        async submit(activeTab, isDisabled, idx) {
            const { valid } = await this.$refs.form.validate();
            const token = localStorage.getItem('loginToken');
            let loanapplyObj = {};
            if (valid) {
                loanapplyObj.name = this.form.id_name;
                loanapplyObj.id_number = this.form.id_number;
                loanapplyObj.idfrontSide = this.form.idfrontSide;
                loanapplyObj.idbackSide = this.form.idbackSide;
                loanapplyObj.contactperson1 = this.form.contactperson1;
                loanapplyObj.phone1 = this.form.phone1;
                loanapplyObj.contactperson2 = this.form.contactperson2;
                loanapplyObj.phone2 = this.form.phone2;
                loanapplyObj.bank_name = this.form.bank_name;
                loanapplyObj.bank_card = this.form.bank_card;
                loanapplyObj.signature = this.form.signature;
                loanapplyObj.remark = this.form.remark;
                if (idx !== undefined) {
                    this.items[idx].disabled = isDisabled;
                }
                this.tab = activeTab;
                if (loanapplyObj.remark !== '') {
                    this.loading = true;
                    if(loanapplyObj.signature == ''){
                        this.loading = false;
                    }
                    api.post('/api/customer_verified', this.form, token)
                        .then(function (res) {
                            // Handle success
                            router.push('/apply-loan-confirm');
                        }.bind(this))
                        .catch(error => {
                            if (error.response) {
                                // Response has been received from the server
                                this.loading = false;
                                this.form.error.message = error.response.data.message;
                            }
                        });
                }
            }
        },
        undo() {
            this.$refs.signaturePad.undoSignature();
        },
        save() {
            const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
            this.form.signature = data;
            this.form.isEmpty = isEmpty;
            if (!isEmpty) {
                this.form.signature_success = '保存成功';
                this.form.signature_alert = true;
                this.form.signature_alert_warning = false;
            } else {
                this.form.signature_success = '请签名';
                this.form.signature_alert_warning = true;
                this.form.signature_alert = false;
            }
            if (data !== undefined) {
                setTimeout(() => {
                    this.form.signature_alert = false
                }, 1000)
            }
        }
    },
    async mounted() {
        const get_username = localStorage.getItem('username');
        this.username = get_username;
    },
    components: {
        Loader
    }
}
</script>
