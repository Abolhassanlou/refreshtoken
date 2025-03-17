<template>
  <div>
    <h2>My Profile</h2>
    <div v-if="user">
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <button @click="logout">Logout</button>
    </div>
    <div v-else-if="error">
      <p style="color: red;">{{ error }}</p>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../utils/axios';
import { useRouter } from 'vue-router';

const user = ref(null);
const error = ref(null);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await api.get('/users/me');
    user.value = response.data;
  } catch (err) {
    console.error('Failed to fetch user data:', err);
    error.value = 'Failed to fetch user data. Please try again later.';
  }
});

const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('expires_in');
  router.push('/login');
};
</script>