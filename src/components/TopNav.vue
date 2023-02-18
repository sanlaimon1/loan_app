<template>
    <v-toolbar color="transparent">
        <GoBack v-show="$route.path != '/'" />
        <span v-if="islogin">
            <v-btn color="black" variant="text" class="mx-0" @click="handleLogout">
                退出
            </v-btn>
        </span>
        <span v-else>
            <router-link to="/register" style="text-decoration:none;">
                <v-btn color="black" variant="text" class="mx-0">
                    注册
                </v-btn>
            </router-link>

            <router-link to="/login" style="text-decoration:none;">
                <v-btn color="black" variant="text" class="mx-2" @click="handleLogIn">
                    登录
                </v-btn>
            </router-link>
        </span>

        <!-- <v-switch
            inset
            color="info"
            v-model="mode"
            @click="handleStyleSwitcher()"
            style="margin-top:17px"
            value="mode"
          ></v-switch> -->

        <v-spacer></v-spacer>
        <v-btn icon>
            <a :href="serviceUrl"><v-icon>mdi-headset</v-icon></a>
        </v-btn>
        &nbsp;
        <v-btn icon>
            <a>
                <v-icon>mdi-chat</v-icon>
            </a>
        </v-btn>
    </v-toolbar>
</template>

<script>
import { router } from "../routes";
import GoBack from "../components/GoBack.vue";

export default {
    data: () => ({
        islogin: false,
        serviceUrl: localStorage.getItem('serviceUrl'),
        mode: 'orange' || localStorage.getItem('mode')
    }),
    methods: {
        handleLogout() {
            if (localStorage.getItem('loginToken') !== null) {
                localStorage.removeItem('loginToken');
                localStorage.removeItem('username');
                localStorage.removeItem('idfrontSide');
                localStorage.removeItem('idbackSide');
                this.islogin = false;
                router.push('/');
            }
        },
        handleLogIn() {
            if (localStorage.getItem('loginToken') !== null) {
                this.islogin = true;
            } else {
                this.islogin = false;
                router.push('/login')
            }
        },
        handleStyleSwitcher() {
            let chkmode=localStorage.getItem('mode');
            localStorage.setItem('mode', chkmode == 'orange' ? 'green' :'orange');
            window.location.reload();
        }
    },
    async mounted() {
        if (localStorage.getItem('loginToken') !== null) {
            this.islogin = true;
        };
        this.mode = localStorage.getItem('mode')
    },
    components: { GoBack },
}
</script>
