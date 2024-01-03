<template>
    <v-item-group mandatory>
        <v-container class="bg-white br-8">
            <v-row>
                <v-col>
                    <span class="text-h6">常用服务</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="item in items" :key="n" cols="3" md="3" sm="3" class="customCard">
                    <v-item>
                        <a :href="item.href">
                            <v-card class="d-flex align-center" dark>
                                <v-scroll-y-transition>
                                    <div class="text-h8 flex-grow-1 text-center text-small">
                                        <p>
                                            <v-icon size="large">{{''+item.icon}}</v-icon>
                                        </p>
                                        <span style="color: #444;font-size: 12px;">{{item.title}}</span>
                                    </div>
                                </v-scroll-y-transition>
                            </v-card>
                        </a>
                    </v-item>
                </v-col>
            </v-row>
        </v-container>
    </v-item-group>
</template>

<script>
export default {
    data: () => ({
        items: [
            {
                title: '钱包提现',
                icon: 'mdi-wallet',
                disabled: false,
                href: '/wallet-withdrawal',
            },
            {
                title: '我的资料',
                icon: 'mdi-account',
                disabled: false,
                href: '/profile',
            },
            {
                title: '借款信息',
                icon: 'mdi-information-outline',
                disabled: true,
                href: '/bill',
            },
            {
                title: '查看还款',
                icon: 'mdi-image-search',
                disabled: false,
                href: '/repayment',
            },
            {
                title: '账号设置',
                icon: 'mdi-account-cog',
                disabled: false,
                href: '/account-setting',
            },
            {
                title: '在线客服',
                icon: 'mdi-headset',
                disabled: true,
                href: localStorage.getItem('serviceUrl')
            },
            {
                title: '常见问题',
                icon: 'mdi-account-key',
                disabled: false,
                href: '/articles',
            },
            {
                title: '关于我们',
                icon: 'mdi-account-group',
                disabled: true,
                href: '/about-us',
            },
            {
                title: '查看合同',
                icon: 'mdi-book-open-variant',
                disabled: true,
                href: '/contract',
            }
        ],
    }),
}

</script>
<style  scoped>
a{
    text-decoration: none;
}
</style>
