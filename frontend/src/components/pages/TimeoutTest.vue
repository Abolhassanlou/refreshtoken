<template>
  <div>
    <h1>Timeout Test Page</h1>
    <p v-if="!apiResponse">Waiting for 180 seconds...</p>
    <p v-if="apiResponse">API Response: {{ apiResponse }}</p>
    <p v-if="apiError">API Error: {{ apiError }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

export default {
  data() {
    return {
      apiResponse: null,
      apiError: null,
    };
  },
  mounted() {
    console.log('mounted go')
    setTimeout(() => {
      console.log('Timeout triggered');
      this.makeApiCall();
    }, 180000); // 180 seconds in milliseconds
  },
  methods: {
    async makeApiCall() {
      const userStore = useUserStore(); // Corrected line
      console.log('makeApiCall started');
      console.log(userStore);
      try {
        const response = await axios.get('http://127.0.0.1:8000/users/me', {
          headers: {
            Authorization: `${userStore.tokenType} ${userStore.accessToken}`,
          },
        });
        console.log('API call successful:', response.data);
        this.apiResponse = response.data;
      } catch (error) {
        console.error('API call error:', error);
        this.apiError = error;
      }
      console.log('makeApiCall finished');
    },
  },
};
</script>