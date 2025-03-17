<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- User Info -->
      <div v-if="userStore.user">
        <h2>Welcome Dear User</h2>
        <h3>{{ userStore.user.name }}</h3>
        <p>Email: {{ userStore.user.email }}</p>

        <!-- Logout Button -->
        <button @click="logoutUser" class="logout-btn">Logout</button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const userStore = useUserStore();
const router = useRouter();

// Fetch user on mounted if not already fetched
onMounted(async () => {
  if (!userStore.user && userStore.accessToken) {
    await userStore.fetchUser();
  }
});

// Logout method
const logoutUser = () => {
  userStore.logout(); // Call the logout method from the store
  router.push('/login'); // Redirect to login page
};
</script>

<style scoped>
.sidebar {
  /* Sidebar-Stile */
  width: 250px;
  background-color: #000; /* Set to pure black */
  padding: 20px;
  position: fixed; /* Sidebar fixed on the side */
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0; /* Underkante */
  color: white; /* Set text color to white */
  font-family: Arial, sans-serif; /* Set a clear font family */
  font-size: 16px; /* Set font size for readability */
}

.content {
  margin-left: 250px;
  padding: 20px;
  overflow-y: auto; /* Enable scrolling in the content area */
  height: 100vh;
}

.sidebar a {
  color: white; /* Set links color to white */
  text-decoration: none;
  display: block;
  margin-bottom: 10px; /* Add space between links */
  padding: 8px;
  border-radius: 4px;
}

.sidebar a:hover {
  background-color: #fd7e14; /* Highlight link on hover with orange */
  color: white; /* Keep text color white on hover */
}

.sidebar .nav-link:hover:not(.logout-btn) {
  color: #fd7e14 !important; 
}

/* Style for the logout button */
.logout-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 4px;
}

.logout-btn:hover {
  background-color: #e02a2a;
}

.sidebar h2, .sidebar h3 {
  color: white; /* Ensure header text is also white */
  margin: 0;
  padding-bottom: 10px;
}

.sidebar p {
  color: white; /* Ensure paragraph text is white */
}
</style>
