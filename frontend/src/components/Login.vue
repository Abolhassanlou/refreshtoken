<template>
  <div>
    <h2>Login</h2>
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="loginError" style="color: red;">{{ loginError }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loginError = ref(null);
const router = useRouter();

const login = async () => {
  try {
    const params = new URLSearchParams();
    params.append('username', email.value);
    params.append('password', password.value);

    const response = await axios.post('http://127.0.0.1:8000/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    const expiresIn = response.data.expires_in;

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('expires_in', expiresIn);

    loginError.value = null;
    console.log('Login successful, access token is:', accessToken);
    console.log('Login successful, refresh token is:', refreshToken);
    router.push('/users/me');

  } catch (error) {
    console.error('Login failed:', error);
    if (error.response && error.response.data && error.response.data.detail) {
      loginError.value = error.response.data.detail;
    } else {
      loginError.value = 'Login failed. Please check your credentials and try again.';
    }
  }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>