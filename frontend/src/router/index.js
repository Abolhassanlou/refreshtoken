import {createRouter, createWebHistory } from  "vue-router";
import Home from "../components/pages/home.vue";
import SignUp from "../components/pages/SignUp.vue";
import Login from "../components/pages/Login.vue";
import AdminPanel from "../components/AdminPanel.vue";
import FoodManagment from "../components/pages/FoodManagement.vue";
import Profile from "../components/pages/Profile.vue";
import MyDishes from "../components/MyDishes.vue";
import EmailConfirmation from "../components/pages/EmailConfirmation.vue";  
import ForgetPassword from "../components/pages/ForgetPassword.vue";
import AccountVerification from "../components/pages/AccountVerification.vue";
import UserDashboard from "../components/pages/UserDashboard.vue";
import ResetPassword from "../components/pages/ResetPassword.vue";
import ChefSignup from "../components/pages/ChefSignup.vue";
import TimeoutTest from "../components/pages/TimeoutTest.vue";


const routes =[
 
  {
    path: '/',
    name: 'Home',
    component: Home, meta: {showNav: true}
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,meta: {showNav: true}
  },
  {
    path:'/email-confirmation',
    name: 'email-confirmation',
    component: EmailConfirmation
  },
    
  {
    path: '/auth/account-verify',
    name: 'AccountVerification',
    component: AccountVerification,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login, meta: {showNav: true}
  },

  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgetPassword, // Add your ForgotPassword component
  },

  {
    path: '/userdashboard',
    name: 'UserDashboard',
    component: UserDashboard
  },
  {
    path: '/chefsignup',
    name: 'Chefsignup',
    component: ChefSignup
  },

  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },

  {
    path: '/admin',
    name: 'Adminpanel',
    component: AdminPanel,meta: {showNav: false}
  },
  {
    path: '/food-management',  // Route für das Food Management
    name: 'FoodManagement',
    component: FoodManagment,
  },
  {
    path: '/profile',  
    name: 'Profile',
    component: Profile,
  },
  {
    path: "/timeout-test",
    name: "TimeoutTest",
    component: TimeoutTest,
  },

  {
    path: '/mydishes',  
    name: 'MyDishes',
    component: MyDishes,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes, // Hier werden die Routen registriert
});

export default router;