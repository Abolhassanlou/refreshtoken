<template>
    <nav class="navbar">
      <div class="logo">Mama Food</div>
      <div class="links">
        <RouterLink v-if="!isLoggedIn" to="/login" class="nav-item">Login</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/signup" class="nav-item">Registrieren</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/home" class="nav-item">Dashboard</RouterLink>
        <RouterLink  to="/admin" class="nav-item">Chef</RouterLink>
        <button v-if="isLoggedIn" @click="logout" class="nav-item logout-btn">Logout</button>
      </div>
    </nav>
  </template>
  
<script setup>
import { ref } from 'vue';

defineProps({
  title: String, // Ermöglicht, den Titel flexibel zu setzen
});

const isLoggedIn = ref(false); 
const logout = () => {
  isLoggedIn.value = false; 
};
</script>

<style scoped>

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 30px;
  background-color: #fff;
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Schattierung für den modernen Look */
  border-bottom: 2px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Logo */
.navbar .logo {
  font-size: 26px;
  font-weight: bold;
  color: #34495e;
  letter-spacing: 2px;
}


.navbar .links {
  display: flex;
  gap: 20px;
  align-items: center;
}


.navbar .nav-item {
  font-size: 16px;
  color: #f39c12;
  text-dcoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.navbar .nav-item:hover {
  background-color: #ffba58;
  color: white;
}

.navbar .logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
}

.navbar .logout-btn:hover {
  background-color: #c0392b;
}

/* Responsive Design: Anpassung für mobile Ansicht */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }

  .navbar .links {
    flex-direction: column;
    gap: 15px;
    width: 100%;
    text-align: left;
  }

  .navbar .nav-item {
    padding: 12px 20px;
    width: 100%;
    text-align: center;
  }
}
</style>