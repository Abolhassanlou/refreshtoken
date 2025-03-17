<template>
  <div>
    <h1>Welcome to My App</h1>
    <p>This is the home page.</p>
    <button @click="goToLogin">
      <font-awesome-icon icon="user" /> Login
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push('/login');
};
</script>