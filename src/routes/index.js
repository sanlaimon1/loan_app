import { createRouter, createWebHistory } from 'vue-router'
import Home from "../pages/Home.vue"
import Login from "../pages/Login.vue"
import Profile from "../pages/Profile.vue"
import Register from "../pages/Register.vue"
import Articles from "../pages/Articles.vue"
import Bill from "../pages/Bill.vue"
import Setting from "../pages/Setting.vue"
import OrderSuccess from "../pages/OrderSuccess.vue"
import AboutUs from "../pages/AboutUs.vue"
import ApplyingLoan from "../pages/ApplyingLoan.vue"
import ApplyingLoanII from "../pages/ApplyingLoanII.vue"
import ProfileSettings from "../pages/ProfileSettings.vue"
import WalletWithdrawal from "../pages/WalletWithdrawal.vue"
import FundingDetails from "../pages/FundingDetails.vue"
import Contract from "../pages/Contract.vue"
import Repayment from "../pages/Repayment.vue"

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login, meta: { requiresAuth: false } },
    { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/register', name: 'Register', component: Register, meta: { requiresAuth: false } },
    { path: '/articles', name: 'Articles', component: Articles, meta: {requiresAuth: false} },
    { path: '/bill', name: 'Bill', component: Bill, meta: {requiresAuth: true} },
    { path: '/account-setting', name: 'Account Settng', component: Setting, meta: { requiresAuth: true } },
    { path: '/order-success', name: 'Order Success', component: OrderSuccess },
    { path: '/about-us', name: 'AboutUs', component: AboutUs, meta: {requiresAuth:true} },
    { path: '/apply-loan', name: 'ApplyingLoan', component: ApplyingLoan, meta: { requiresAuth: true } },
    { path: '/apply-loan-confirm', component: ApplyingLoanII, meta: { requiresAuth: true } },
    { path: '/profile-settings', name: 'ProfileSettings', component: ProfileSettings },
    { path: '/wallet-withdrawal', name: 'Wallet Withdrawal', component: WalletWithdrawal, meta: { requiresAuth: true } },
    { path: '/fundingDetails', name: 'FundingDetails', component: FundingDetails, meta: { requiresAuth: true } },
    { path: '/contract', name: 'Contract', component: Contract, meta: { requiresAuth: true } },
    { path: '/repayment', name: 'Repayment', component: Repayment, meta: {requiresAuth:true}}
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    if (to.meta.requiresAuth && !localStorage.getItem('loginToken')) {
        return {
            path: '/login'
        }
    }
})
