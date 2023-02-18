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
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('verify','contactMember', false, 1)"
                        enctype="multipart/form-data">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field type="text" v-model="form.id_name" :rules="nameRules" label="身份证姓名">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field type="number" v-model="form.id_number" :rules="nameRules" label="身份证号">
                                </v-text-field>
                            </v-col>

                            <v-col cols="6" md="6" align="center">
                                <v-label style="text-align: center; font-weight: bold;">头像面</v-label>
                                <v-col cols="12" md="6" style="padding: 0% !important;">
                                    <div v-if="!form.idfrontSideUploaded">
                                        <v-img src="assets/front-of-id-card.png" width="90%" height="75%"></v-img>
                                    </div>
                                    <div v-else>
                                        <v-img :src="form.idfrontSideUploaded" width="90%" height="75%"></v-img>
                                    </div>
                                    <v-file-input class="file_input" v-model="form.idfrontSide" :rules="fileSizeRules" label="" prepend-icon="mdi-camera"
                                        accept="image/*;capture=camera" @change="saveFrontPhoto"></v-file-input>
                                    <v-progress-linear v-model="progress" color="green" height="20" :model-value="progress"
                                        striped v-show="progress < 100"></v-progress-linear>
                                </v-col>
                            </v-col>

                            <v-col cols="6" md="6" align="center">
                                <v-label style="text-align: center; font-weight: bold;">国徽面</v-label>
                                <v-col cols="12" md="6" style="padding: 0% !important;">
                                    <div v-if="!form.idbackSideUploaded">
                                        <v-img src="assets/back-of-id-card.png" width="90%" height="75%"></v-img>                                
                                    </div>
                                    <div v-else>
                                       
                                        <v-img :src="form.idbackSideUploaded" width="90%" height="75%"></v-img>
                                    </div>
                                    <v-file-input class="file_input" v-model="form.idbackSide" :rules="fileSizeRules" label="" prepend-icon="mdi-camera"
                                        accept="image/*;capture=camera" @change="saveBackPhoto"></v-file-input>
                                    <v-progress-linear v-model="progress2" color="green" height="20" :model-value="progress2"
                                        striped v-show="progress2 < 100"></v-progress-linear>
                                </v-col>
                            </v-col>

                            <!-- <span style="color: red;display: block;padding: 10px 40px;">{{
                                form.error.message ?
                                form.error.message : ''
                            }}</span> -->

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
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('contact_person','cardInfo', false, 2)">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field type="text" v-model="form.contactperson1" :rules="nameRules" label="联系人姓名">
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

                            <!-- <span style="color: red">{{
                                        form.error.message ? form.error.message : ''
                                    }}</span> -->

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
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('bankcard_info','signature', false, 3)">
                        <v-row>
                            <v-col cols="12">
                                <v-select v-model="form.bank_name" :items="banks" label="银行名称" :rules="nameRules">
                                </v-select>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field type="text" v-model="form.id_name" label="姓名">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field type="number" v-model="form.bank_card" label="卡号" :rules="numberRules">
                                </v-text-field>
                                <!-- <span style="color: red">{{
                                    form.error.message ? form.error.message : ''
                                }}</span> -->
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

                <v-window-item value="personalInfo" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('personal_info','signature', false, 4)">
                        <v-row>

                            <v-expansion-panels v-model="panel" multiple>
                                <v-expansion-panel>
                                    <v-expansion-panel-title>个人信息</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-select :disabled="form.disabled" v-model="form.residential" :items="residential" label="住宅性质" :rules="nameRules">
                                                </v-select>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select :disabled="form.disabled" v-model="form.education" :items="education" label="教育程度" :rules="nameRules">
                                                </v-select>
                                            </v-col>

                                            <v-col cols="12" md="6">
                                                <v-select :disabled="form.disabled" v-model="form.marital" :items="marital" label="婚姻状态" :rules="nameRules">
                                                </v-select>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field type="text" v-model="form.contact_info" :disabled="form.disabled" label="联系方式" :rules="nameRules">
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="6">
                                                <v-select :disabled="form.disabled" v-model="form.province_residence" :items="province_residence" label="居住省份" :rules="nameRules">
                                                </v-select>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field type="text" v-model="form.address" :disabled="form.disabled" label="详细地址" :rules="nameRules">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>

                                <v-expansion-panel>
                                    <v-expansion-panel-title>单位信息</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field type="text" v-model="form.company_name" :disabled="form.disabled" label="单位名称" :rules="nameRules">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select :disabled="form.disabled" v-model="form.social_status" :items="social_status" label="社会身份" :rules="nameRules">
                                                </v-select>
                                            </v-col>

                                            <v-col cols="12" md="6">
                                                <v-select :disabled="form.disabled" v-model="form.unit_type" :items="unit_type" label="单位类别" :rules="nameRules">
                                                </v-select>
                                            </v-col>
                                            <v-col cols="6" md="3">
                                                <v-select :disabled="form.disabled" v-model="form.unit_address_state" :items="unit_address_state" :onchange="get_township(form.unit_address_state)" label="单位地址" :rules="nameRules">
                                                </v-select>
                                            </v-col>
                                            <v-col cols="6" md="3">
                                                <v-select :disabled="form.disabled" v-model="form.unit_address_township" :items="selected_township" label="单位地址" :rules="nameRules">
                                                </v-select>
                                            </v-col>

                                            <v-col cols="12" md="6">
                                                <v-text-field type="text" v-model="form.unit_other_address" :disabled="form.disabled" label="详细地址" :rules="nameRules">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select :disabled="form.disabled" v-model="form.monthly_income" :items="monthly_income" label="月收入" :rules="nameRules">
                                                </v-select>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field type="number" v-model="form.work_phone" :disabled="form.disabled" label="单位电话" :rules="nameRules">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>

                                <v-expansion-panel>
                                    <v-expansion-panel-title>直系亲属联系人</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field type="text" v-model="form.family_name" :disabled="form.disabled" label="姓名" :rules="nameRules">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field type="number" v-model="form.family_ph_number" :disabled="form.disabled" label="手机号码" :rules="nameRules">
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="6">
                                                <v-select :disabled="form.disabled" v-model="form.family_relation" :items="family_relation" label="关系" :rules="nameRules">
                                                </v-select>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>

                                <v-expansion-panel>
                                    <v-expansion-panel-title>紧急联系人</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field type="text" v-model="form.emergency_name" :disabled="form.disabled" label="姓名" :rules="nameRules">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field type="number" v-model="form.emergency_ph_number" :disabled="form.disabled" label="手机号码" :rules="nameRules">
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="6">
                                                <v-select :disabled="form.disabled" v-model="form.emergency_relation" :items="family_relation" label="关系" :rules="nameRules">
                                                </v-select>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>

                            <span style="color: red;display: block;padding: 10px 40px;">{{
                                form.error.message ?
                                    form.error.message : ''
                            }}</span>

                            <v-btn block color="#f6655a" size="large" type="submit" :disabled="form.disabled">
                                下一步
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-window-item>

                <v-window-item value="signature" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('sign','remark', false, 5)">
                        <v-alert closable close-label="Close Alert" type="success" :value="form.signature_alert"
                            v-if="form.signature_alert">
                            {{ form.signature_success }}
                        </v-alert>
                        <v-alert closable close-label="Close Alert" type="warning" :value="form.signature_alert"
                            v-if="form.signature_alert_warning">
                            {{ form.signature_success }}
                        </v-alert>

                        <VueSignaturePad id="signature" width="100%" height="200px" ref="signaturePad"
                            :options="{ onBegin: () => { $refs.signaturePad.resizeCanvas() } }" v-model="form.signature" />
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

                        <span style="color: red;display: block;padding: 10px 40px;">{{
                            form.error.message ?
                                form.error.message : ''
                        }}</span>

                        <v-btn block color="#f6655a" size="large" type="submit"
                            :disabled="form.isverified == '已验证' ? true : false">
                            下一步
                        </v-btn>
                    </v-form>
                </v-window-item>

                <v-window-item value="remark" class="medium-pd">
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit('remark','remark', false, 5)"
                        method="post">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="text" v-model="form.remark" label="备注" :rules="nameRules">
                                </v-text-field>
                            </v-col>
                            <div class="v-input__details">
                                <div class="v-messages">
                                    <div class="v-messages__message" style="transform-origin: center top 0px;">
                                        {{ form.error.message ? form.error.message : '' }}
                                    </div>
                                </div>
                            </div>
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
import axios, { formToJSON } from 'axios';
import { router } from "../routes"
import Loader from "../components/Loader.vue";
import ProgressBar from "../components/ProgressBar.vue"
import api from '../api';

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
            isEmpty: true,
            except: 6,
            idfrontSideUploaded: '',
            idbackSideUploaded: '',

            residential: '',
            education: '',
            marital: '',
            contact_info: '',
            province_residence: '',
            address: '',
            social_status: '',
            unit_type: '',
            unit_address_state:'',
            unit_address_township:'',
            unit_other_address:'',
            monthly_income:'',
            work_phone:'',
            family_name:'',
            family_ph_number:'',
            family_relation:'',
            emergency_name:'',
            emergency_ph_number:'',
            emergency_relation:'',
            fileInput: false,
        },
        nameRules: [
            v => !!v || '必填项'
        ],
        numberRules: [
            v => !v.trim() || false,
            v => (v.length >= 16 && v.length <= 19) || '需要16-19位数字',
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
            v => !v || !v.some(file => file.size > 8e6) || '上传文件不能大于8M',
            // files => !files || !files.some(file => file.size > 2_097_152) || 'Avatar size should be less than 2 MB!'
        ],
        tab: null,
        items: [
            { value: "verify", text: "验证", disabled: false }, { value: "contactMember", text: "联系人", disabled: true },
            { value: "cardInfo", text: "银行卡信息", disabled: true }, { value: "personalInfo", text: "个人资料", disabled: true },
            { value: "signature", text: "签名", disabled: true }, { value: "remark", text: "备注", disabled: true }
        ],
        username: '',
        banks: [
            "中国农业银行", "中国工商银行", "中国建设银行", "中国银行", "中国光大银行", "中国民生银行", "中信银行", "交通银行",
            "华夏银行", "招商银行", "兴业银行", "广发银行", "平安银行", "上海浦东发展银行", "恒丰银行", "浙商银行", "渤海银行", "中国邮政储蓄银行", "城市商业银行"
        ],
        progress: 100,
        progress2: 100,
        residential: ["住宅性质", "商品房", "经济适用房", "单位用房", "独自租房", "自建房", "其他"],
        education: ["初中", "高中", "专科", "本科", "硕士"],
        marital: ["已婚","未婚"],
        province_residence: [
            "北京", "上海", "重庆", "天津", "香港", "澳门", "内蒙古自治区", "新疆维吾尔自治区", "广西壮族自治区", "宁夏回族自治区",
            "西藏自治区", "黑龙江", "吉林", "辽宁", "河北", "山西", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北",
            "湖南", "广东", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "台湾"],
        social_status: ["营业员／服务员收银员／快递服务", "公务员／教师／医生／其他公务人员", "个体户／企业负责人", "企业一般员工",
            "企业管理层", "销售／中介", "普遍工人", "在校学生", "无业／退休", "其他"],
        unit_type: ["国有企业", "外商投资", "私营企业", "批发／零售", "农业／工业／服务业", "邮电／通信／社区服务", "旅游／宾馆／餐饮业", "其他"],
        monthly_income: ["1000-3000", "5000-8000", "10000-30000", "50000以上"],
        family_relation: ["配偶", "父子", "母子", "亲属", "朋友", "同事", "其他"],
        unit_address_state: [],
        state_township: [],
        selected_township: [],
        panel: [0],
    }),
    methods: {
        test() {
            console.log("test hit");
        },
        async submit(tabName,activeTab, isDisabled, idx) {
            const isOnline = navigator.onLine;
            const { valid } = await this.$refs.form.validate();
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
                    'content-type': 'multipart/form-data'
                }
            };
            // let loanapplyObj = {};
            // if (valid && isOnline) {
            //     loanapplyObj.name = this.form.id_name;
            //     loanapplyObj.id_number = this.form.id_number;
            //     loanapplyObj.idfrontSide = this.form.idfrontSide;
            //     loanapplyObj.idbackSide = this.form.idbackSide;
            //     loanapplyObj.contactperson1 = this.form.contactperson1;
            //     loanapplyObj.phone1 = this.form.phone1;
            //     loanapplyObj.contactperson2 = this.form.contactperson2;
            //     loanapplyObj.phone2 = this.form.phone2;
            //     loanapplyObj.bank_name = this.form.bank_name;
            //     loanapplyObj.bank_card = this.form.bank_card;
            //     loanapplyObj.signature = this.form.signature;
            //     loanapplyObj.remark = this.form.remark;
            //     if (idx !== undefined) {
            //         this.items[idx].disabled = isDisabled;
            //     }
            //     this.tab = activeTab;
            //     if (loanapplyObj.remark !== '') {
            //         this.loading = true;
            //         if (loanapplyObj.signature == '') {
            //             this.loading = false;
            //         }
            //         axios.post('/api/customer_verified', this.form, config)
            //             .then(function (res) {
            //                 // Handle success
            //                 router.push('/apply-loan-confirm');
            //             }.bind(this))
            //             .catch(error => {
            //                 if (error.response) {
            //                     // Response has been received from the server
            //                     this.loading = false;
            //                     this.form.error.message = error.response.data.message;
            //                 }
            //             });
            //     }
            // } else {
            //     //alert("请检查网络连接");
            // }
            let loanapplyObj = {};
            if (valid) {
                if(tabName == 'verify') {
                    loanapplyObj.name = this.form.id_name;
                    loanapplyObj.id_number = this.form.id_number;
                }else if(tabName == 'contact_person') {
                    loanapplyObj.contactperson1 = this.form.contactperson1;
                    loanapplyObj.phone1 = this.form.phone1;
                    loanapplyObj.contactperson2 = this.form.contactperson2;
                    loanapplyObj.phone2 = this.form.phone2;
                }else if(tabName == 'bankcard_info') {
                    loanapplyObj.bank_name = this.form.bank_name;
                    loanapplyObj.bank_card = this.form.bank_card;
                }else if(tabName == 'personal_info') {
                    loanapplyObj.residential = this.form.residential;
                    loanapplyObj.education = this.form.education;
                    loanapplyObj.marital = this.form.marital;
                    loanapplyObj.contact_info = this.form.contact_info;
                    loanapplyObj.province_residence = this.form.province_residence;
                    loanapplyObj.address = this.form.address;
                    loanapplyObj.social_status = this.form.social_status;
                    loanapplyObj.unit_type = this.form.unit_type;
                    loanapplyObj.unit_address_state = this.form.unit_address_state;
                    loanapplyObj.unit_address_township = this.form.unit_address_township;
                    loanapplyObj.unit_other_address = this.form.unit_other_address;
                    loanapplyObj.monthly_income = this.form.monthly_income;
                    loanapplyObj.work_phone = this.form.work_phone;
                    loanapplyObj.family_name = this.form.family_name;
                    loanapplyObj.family_ph_number = this.form.family_ph_number;
                    loanapplyObj.family_relation = this.form.family_relation;
                    loanapplyObj.emergency_name = this.form.emergency_name;
                    loanapplyObj.emergency_ph_number = this.form.emergency_ph_number;
                    loanapplyObj.emergency_relation = this.form.emergency_relation;
                }else if(tabName == 'sign') {
                    loanapplyObj.signature = this.form.signature;
                    if (loanapplyObj.signature == '' || loanapplyObj.signature == undefined) {
                        this.form.loading = false;
                        this.form.error.message = '您的签名没有保存';
                    }
                }else{
                    loanapplyObj.remark = this.form.remark;
                    if (loanapplyObj.remark !== '') {
                        this.form.loading = true;
                    }
                }
                if (idx !== undefined) {
                    this.items[idx].disabled = isDisabled;
                }
                if (isOnline) {
                    // this.form.loading = true;
                    const get_api = '/api/oneuser/' + tabName;
                    axios.post(get_api , this.form, config)
                        .then(function (res) {
                            // Handle success
                            this.tab = activeTab;
                            if(tabName == 'remark'){
                                router.push('/apply-loan-confirm');
                            }

                        }.bind(this))
                        .catch(error => {
                            if (error.response) {
                                console.log(idx);
                                console.log(tabName);
                                // Response has been received from the server
                                // this.tab = tabName;
                                // this.items[idx].disabled = false;
                                this.form.loading = false;
                                this.form.error.message = error.response.data.message;
                            }
                        });
                } else {
                    this.form.error.message = '请检查网络连接';
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
        async saveFrontPhoto() {
            this.progress = 0;
            const token = localStorage.getItem('loginToken');
            const config = {
                onUploadProgress: progressEvent => {
                    const { loaded, total } = progressEvent;
                    this.progress = Math.round((loaded * 100) / total);
                }
            };
            //changing webp
            /*
             * https://stackoverflow.com/questions/62209609/how-to-convert-any-image-to-webp
             */
            let image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                canvas.getContext('2d').drawImage(image, 0, 0);
                canvas.toBlob((blob) => {
                    // Now we have a `blob` containing webp data
                    // Use the file rename trick to turn it back into a file
                    const myImage = new File([blob], 'my-new-name.webp', { type: blob.type });
                    api.post('/api/oneuser/frontid_image', { 'idfrontSide': myImage }, token, config)
                        .then(function (res) {
                            // Handle success
                            if (res.status == 200) {
                                localStorage.setItem('idfrontSide', api.apiRoot + res.data.frontid_image_path);
                                this.form.idfrontSideUploaded = api.apiRoot + res.data.frontid_image_path;
                                this.progress = 100;
                            }
                        }.bind(this))
                        .catch(error => {
                            if (error.response) {
                                // Response has been received from the server
                                this.loading = false;
                                this.progress = 0;
                                this.form.error.message = error.response.data.message;
                            }
                        });
                }, 'image/webp');
            }
            image.src = URL.createObjectURL(this.form.idfrontSide[0]);
        },
        async saveBackPhoto() {
            this.progress2 = 0;
            const token = localStorage.getItem('loginToken');
            const config = {
                onUploadProgress: progressEvent => {
                    const { loaded, total } = progressEvent;
                    this.progress = Math.round((loaded * 100) / total)/2;
                }
            };
            let image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                canvas.getContext('2d').drawImage(image, 0, 0);
                canvas.toBlob((blob) => {
                    // Now we have a `blob` containing webp data
                    // Use the file rename trick to turn it back into a file
                    const myImage = new File([blob], 'my-new-name.webp', { type: blob.type });
                    api.post('/api/oneuser/backid_image', { 'idbackSide': myImage }, token, config)
                        .then(function (res) {
                            // Handle success
                            if (res.status == 200) {
                                localStorage.setItem('idbackSide', api.apiRoot + res.data.backid_image_path);
                                this.form.idbackSideUploaded = api.apiRoot + res.data.backid_image_path;
                                this.progress2 = 100;
                            }
                        }.bind(this))
                        .catch(error => {
                            if (error.response) {
                                // Response has been received from the server
                                this.loading = false;
                                this.progress2 = 0;
                                this.form.error.message = error.response.data.message;
                            }
                        });
                }, 'image/webp');
            }
            image.src = URL.createObjectURL(this.form.idbackSide[0]);
        }
    },
    async mounted() {
        const get_username = localStorage.getItem('username');
        this.username = get_username;
        const frontimg = localStorage.getItem('idfrontSide');
        this.form.idfrontSideUploaded = frontimg;
        const backimg = localStorage.getItem('idbackSide');
        this.form.idbackSideUploaded = backimg;
    },
    components: {
        Loader,
        ProgressBar
    }
}
</script>
