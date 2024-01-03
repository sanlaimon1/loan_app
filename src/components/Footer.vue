<template>
    <v-row>
        <v-col md="12">
            <v-breadcrumbs :items="items">
                <template v-slot:divider>
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
            </v-breadcrumbs>

            <v-breadcrumbs :items="itemsII" class="center-align mb-8vh">
                <template v-slot:divider>
                    <v-icon icon="mdi-poweron"></v-icon>
                </template>
            </v-breadcrumbs>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        items: [
            {
                title: '申请条件',
                disabled: false,
                href: '/articles',
            },
            {
                title: '借款攻略',
                disabled: false,
                href: '/articles',
            },
            {
                title: '使用帮助',
                disabled: true,
                href: '/articles',
            },
        ],
        itemsII: [
            {
                title: '持牌机构',
                disabled: false,
                href: '/',
            },
            {
                title: '1亿+组册用户',
                disabled: false,
                href: '/',
            },
            {
                title: '安全备案',
                disabled: false,
                href: '/',
            },
        ],
    }),
}
</script>
