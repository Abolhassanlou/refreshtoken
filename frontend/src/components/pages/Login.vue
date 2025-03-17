<template>
  <div v-if="isOpen" class="glass-container">
    <div class="glass-box">
      <button class="close-btn" @click="closeModal">×</button>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Enter E-Mail" />
        <input type="password" v-model="password" placeholder="Enter Password" />
        <button class="btn" type="submit">Login</button>
        <p class="forgot-password">
          <router-link to="/forgot-password">Forgot Password?</router-link>
        </p>
        <p class="signup-link">
          No Account? <router-link to="/signup">Register Here</router-link>
        </p>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const userStore = useUserStore();
const router = useRouter();
const error = ref('');
const isOpen = ref(true);

async function login() {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields!';
    return;
  }
  error.value = '';

  try {
    const formData = new URLSearchParams();
    formData.append('username', email.value);
    formData.append('password', password.value);

    const response = await axios.post('http://127.0.0.1:8000/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Backend Response:', response); // Log the entire response

    userStore.setAccessToken(response.data.access_token);
    userStore.setRefreshToken(response.data.refresh_token);
    userStore.setExpiresIn(Date.now() + response.data.expires_in * 1000);
    userStore.setTokenType(response.data.token_type);
    console.log('Expires In (seconds):', response.data.expires_in); // Log expires_in in seconds
    console.log('Expires In (timestamp):', Date.now() + response.data.expires_in * 1000); //Log expire in timestamp

    console.log('Access Token:', response.data.access_token); // Log access token
    console.log('Refresh Token:', response.data.refresh_token); // Log refresh token
    

    console.log('Access Token in UserStore:', userStore.accessToken); // Log token after setting in store
    console.log('Refresh Token in UserStore:', userStore.refreshToken); // Log token after setting in store

    await userStore.fetchUser();
    if (userStore.role === 0) {
      router.push('/userdashboard');
    } else if (userStore.role == 1) {
      router.push('/admin');
    } else {
      router.push('/userdashboard'); // Default case
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        error.value = 'Incorrect username or password.';
      } else if (err.response.status === 500) {
        error.value = 'Server error. Please try again.';
      } else {
        error.value = err.response.data.detail || 'Login failed.';
      }
    } else {
      error.value = 'Network error or backend unavailable.';
    }
    console.error('Login Error:', err); // Log the error
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/_button.scss' as *;

.glass-container {
  text-align: center;
  display: flex;

  .glass-box {
    position: relative;
    background: rgba(255, 250, 240, 0.8);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin: auto;
    margin-top: 40px;

    h1 {
      font-size: 35px;
      color: #4d331f;
      margin-bottom: 20px;
    }

    input {
      width: 100%;
      padding: 12px 20px;
      margin-bottom: 20px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      font-size: 16px;
      background: rgba(255, 255, 255, 0.4);
      color: #4d331f;
      outline: none;
      transition: all 0.3s ease-in-out;

      &::placeholder {
        color: rgba(77, 51, 31, 0.7);
      }

      &:focus {
        border-color: #ffba58;
        box-shadow: 0 0 10px rgba(255, 186, 88, 0.5);
      }
    }

    .btn {
      @extend button;
      margin-top: 15px;
    }

    .forgot-password {
      margin-top: 10px;
      a {
        color: #ffba58;
        text-decoration: none;
      }
    }

    .signup-link {
      margin-top: 10px;
    }
    .close-btn {
      position: absolute;
      top: 15px;
      right: 20px;
      background: none;
      border: none;
      font-size: 24px;
      color: #333;
      cursor: pointer;
      transition: 0.3s;
    }
    .close-btn:hover {
      color: red;
    }
  }
}
</style>

