<template>
    <div>
      <h2>Change Password</h2>
      <form @submit.prevent="changePassword">
        <div>
          <label>New Password:</label>
          <input type="password" v-model="newPassword" required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" v-model="confirmPassword" required />
        </div>
        <button type="submit">Save</button>
      </form>
      <p v-if="message" :class="messageType">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        message: '',
        messageType: '', // success یا error
      };
    },
    methods: {
      async changePassword() {
        if (this.newPassword !== this.confirmPassword) {
          this.message = 'Passwords do not match!';
          this.messageType = 'error';
          return;
        }
  
        try {
          // گرفتن ایمیل کاربر از localStorage یا Vuex
          const email = localStorage.getItem('email');
          const token = localStorage.getItem('token'); // فرض بر این که هنگام ورود توکن ذخیره شده است
  
          const response = await axios.post('http://127.0.0.1:8000/users/reset-password', {
            email: email,
            token: token,
            new_password: this.newPassword
          });
  
          this.message = 'Password changed successfully!';
          this.messageType = 'success';
  
          // پاک کردن فرم
          this.newPassword = '';
          this.confirmPassword = '';
  
        } catch (error) {
          this.message = 'Failed to change password: ' + error.response.data.detail;
          this.messageType = 'error';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  </style>
  