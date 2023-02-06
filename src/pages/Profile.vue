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
        </v-card-title><br />

        <v-card-title>
            <span class="text-h5">{{ form.isverified }}</span>
        </v-card-title>
        <!-- https://www.codermen.com/how-to-display-a-loader-while-sent-request-is-in-progress-in-vue/ -->
        <div v-if="form.loading">
            <Loader />
        </div>

        <v-card>
            <v-tabs v-model="tab" bg-color="primary" update:tab2Disabled fixed-tabs>
                <v-tab v-for="item in items" :key="item" :value="item.value"
                    :disabled="form.isverified == '已验证' ? false : item.disabled">
                    {{ item.text }}
                </v-tab>
            </v-tabs>

            <v-window v-model="tab">
                <v-window-item value="verify" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation
                        @submit.prevent="submit('contactMember', false, 1)" enctype="multipart/form-data">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field type="text" v-model="form.id_name" :disabled="form.disabled"
                                    :rules="nameRules" label="身份证姓名">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field type="text" v-model="form.id_number" :disabled="form.disabled"
                                    :rules="nameRules" label="身份证号">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="6" v-if="form.disabled == true">
                                <img v-bind:src="'https://www.shenbizi.com/'+form.idfrontSide" style="width: 50%;">
                            </v-col>
                            <v-col cols="12" md="6" v-else>
                                <v-file-input v-model="form.idfrontSide" :rules="fileSizeRules" label="请上传身份证正面"
                                    accept="image/*"></v-file-input>
                            </v-col>

                            <v-col cols="12" md="6" v-if="form.disabled == true">
                                <img v-bind:src="'https://www.shenbizi.com/'+form.idbackSide" style="width: 50%;">
                            </v-col>
                            <v-col cols="12" md="6" v-else>
                                <v-file-input v-model="form.idbackSide" :rules="fileSizeRules" label="请上传身份证背面"
                                    accept="image/*"></v-file-input>
                            </v-col>

                            <span style="color: red">{{
                                form.error.message ? form.error.message : ''
                            }}</span>
                            <v-btn block color="#f6655a" size="large" type="submit" :disabled="form.disabled">
                                下一步
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-window-item>

                <v-window-item value="contactMember" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('cardInfo', false, 2)">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field type="text" :disabled="form.disabled" v-model="form.contactperson1"
                                    :rules="nameRules" label="联系人姓名">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field type="number" :disabled="form.disabled" v-model="form.phone1"
                                    :rules="nameRules" label="联系人电话">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field type="text" :disabled="form.disabled" v-model="form.contactperson2"
                                    label="联系人姓名">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field type="number" :disabled="form.disabled" v-model="form.phone2"
                                    label="联系人电话">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field type="text" :disabled="form.disabled" v-model="form.id_name"
                                    label="身份证姓名">
                                </v-text-field>
                            </v-col>

                            <span style="color: red">{{
                                form.error.message ? form.error.message : ''
                            }}</span>
                            <v-btn block color="#f6655a" size="large" type="submit" :disabled="form.disabled">
                                下一步
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-window-item>

                <v-window-item value="cardInfo" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('signature', false, 3)">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="text" :disabled="form.disabled" v-model="form.bank_name"
                                    label="银行名称" :rules="nameRules">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field type="number" :disabled="form.disabled" v-model="form.bank_card"
                                    label="卡号" :rules="nameRules">
                                </v-text-field>
                                <span style="color: red">{{
                                    form.error.message ? form.error.message : ''
                                }}</span>
                            </v-col>

                            <v-btn block color="#f6655a" size="large" type="submit" :disabled="form.disabled">
                                下一步
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-window-item>

                <v-window-item value="signature" class="medium-pd" style="padding-top: 0px; padding-bottom: 0px;">
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('remark', false, 4)">
                        <!-- <VueSignaturePad id="signature" width="100%" height="200px" ref="signaturePad"
                            :options="{ onBegin: () => { $refs.signaturePad.resizeCanvas() } }"
                            v-model="form.signature" /> -->

                        <v-alert close-label="Close Alert" type="success" :value="form.signature_alert"
                            v-if="form.signature_alert">
                            {{ form.signature_success }}
                        </v-alert>
                        <v-alert close-label="Close Alert" type="warning" :value="form.signature_alert"
                            v-if="form.signature_alert_warning">
                            {{ form.signature_success }}
                        </v-alert>

                        <v-col cols="12" md="6" v-if="form.disabled == true">
                            <img :src="form.signature" style="width: 100%;">
                        </v-col>
                        <v-col cols="12" md="6" v-else>
                            <VueSignaturePad id="signature" width="100%" height="200px" ref="signaturePad"
                                :options="{ onBegin: () => { $refs.signaturePad.resizeCanvas() } }"
                                v-model="form.signature" />
                        </v-col>

                        <v-row>
                            <v-col cols="6" md="6">
                                撤销 <v-btn icon="mdi-cached" :disabled="form.disabled" color="info"
                                    @click="undo"></v-btn>
                            </v-col>

                            <v-col cols="6" md="6" class="text-right">
                                <v-btn size="large" :disabled="form.disabled" color="success" @click="save">
                                    保存
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-btn block color="#f6655a" size="large" type="submit" :disabled="form.disabled">
                            下一步
                        </v-btn>
                    </v-form>
                    <br /><br />
                </v-window-item>


                <v-window-item value="remark" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('remark', false, 4)"
                        method="post">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="text" :disabled="form.disabled" v-model="form.remark" label="贷款用途"
                                    :rules="nameRules">
                                </v-text-field>
                            </v-col>

                            <span style="color: red;display: block;padding: 10px 40px;">{{
                                form.error.message ?
                                    form.error.message : ''
                            }}</span>
                            <!-- <v-btn block color="#f6655a" size="large" type="submit" :disabled="form.disabled">
                                申请贷款
                            </v-btn> -->
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
import axios from 'axios';
import { router } from "../routes"
import Loader from "../components/Loader.vue";

export default {
    data: () => ({
        valid: true,
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
            signature: '',
            error: {},
            loading: false,
            isverified: '',
            verifiedStatus: '',
            disabled: null,
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
            v => (v && v.length <= 11) || '请添加合法的手机号',
        ],
        emailRules: [
            v => !!v || '必填项',
            v => /.+@.+\..+/.test(v) || 'E-mail必须合法的格式',
        ],
        passwordRules: [
            v => !!v || '必填项',
            v => (v && v.length >= 4) || '不能小于4位',
        ],
        fileSizeRules: [
            v => !!v || '必填项',
            // v => (v && v[0].size > 3 * 1024 * 1024) && '上传文件不能大于3M'
            v => !v || !v.some(file => file.size > 3e6) || '上传文件不能大于3M'
        ],
        tab: null,
        items: [
            { value: "verify", text: "验证", disabled: false }, { value: "contactMember", text: "联系人", disabled: true },
            { value: "cardInfo", text: "银行卡信息", disabled: true }, { value: "signature", text: "签名", disabled: true },
            { value: "remark", text: "备注", disabled: true }
        ],
        options: {
            penColor: "#c0f",
        },
        username: '',
    }),
    components: {
        Loader
    },
    methods: {
        async submit(activeTab, isDisabled, idx) {
            const { valid } = await this.$refs.form.validate();
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
                    'content-type': 'multipart/form-data',
                    method: 'HEAD',
                    mode: 'no-cors',
                }
            };
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
                    this.form.loading = true;
                    if (loanapplyObj.signature == '' || loanapplyObj.signature == undefined) {
                        this.form.loading = false;
                        this.form.error.message = 'The signature field is required.';
                    } else {
                        this.form.loading = true;
                        axios.post('http://api.cybdzw.com/api/customer_verified', this.form, config)
                            .then(function (res) {
                                // Handle success
                                router.push('/profile');
                                window.location.reload();
                            }.bind(this))
                            .catch(error => {
                                if (error.response) {
                                    // Response has been received from the server
                                    this.form.loading = false;
                                    this.form.error.message = error.response.data.message;
                                }
                            });
                    }

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
        },
    },
    async mounted() {
        const get_username = localStorage.getItem('username');
        this.username = get_username;
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('loginToken')}`, method: 'HEAD',
                mode: 'no-cors',
            }
        };
        await axios.get('http://api.cybdzw.com/api/customer_verified', config)
            .then(function (res) {
                console.log("imgBug=",res)
                const verifiedStatus = res.data.data.message || res.data.data.attribute.message;
                this.verifiedStatus = res.data.data.message || res.data.data.attribute.message;

                if (verifiedStatus == "已验证") {
                    this.form.isverified = res.data.data.attribute.message;
                    this.form.id_name = res.data.data.attribute.id_name;
                    this.form.id_number = res.data.data.attribute.id_number;
                    this.form.idfrontSide = res.data.data.attribute.idfrontSide;
                    this.form.idbackSide = res.data.data.attribute.idbackSide;
                    this.form.contactperson1 = res.data.data.attribute.contactperson1;
                    this.form.phone1 = res.data.data.attribute.phone1;
                    this.form.contactperson2 = res.data.data.attribute.contactperson2;
                    this.form.phone2 = res.data.data.attribute.phone2;
                    this.form.bank_name = res.data.data.attribute.bank_name;
                    this.form.bank_card = res.data.data.attribute.bank_card;
                    this.form.remark = res.data.data.attribute.remark;
                    this.form.signature = res.data.data.attribute.signature;

                    this.items[1].disabled = false;
                    this.items[2].disabled = false;
                    this.items[3].disabled = false;
                    this.items[4].disabled = false;
                }

                if (verifiedStatus == '已验证') {
                    this.form.disabled = true;
                } else if (verifiedStatus == '未验证') {
                    this.form.disabled = false;
                }
                // if (res.data.data.attribute.message == 'verified') {
                //     router.push('/apply-loan-confirm');
                // } else if(res.data.data.attribute.message == 'notverified'){
                //     router.push('/apply-loan');
                // }
            }.bind(this))
            .catch(error => {
                if (error.response) {
                    // Response has been received from the server
                    console.log(error.response.data);
                    // this.form.error.message = error.response.data.message
                }
            });

    }
}
</script>
<style>
.v-tab.v-tab {
    min-width: 10px !important;
    padding: 0% !important;
}
</style>
