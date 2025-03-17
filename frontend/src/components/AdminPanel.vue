<script setup lang="ts">
import MyDishes from './MyDishes.vue';

</script>

<template>
  <div class="d-flex vh-100">
    <!-- Sidebar -->
    <div class="sidebar bg-dark text-light p-3 d-flex flex-column">
      <div class="text-center mb-3">
        <img src="https://via.placeholder.com/80" class="rounded-circle mb-2" alt="Chef">
        <h5 class="mt-2">Chef John Doe</h5>
      </div>

      <ul class="nav flex-column mb-auto">
        <li class="nav-item">
          <a class="nav-link text-light d-flex align-items-center" href="/profile">
            <i class="fas fa-user-circle me-2"></i> <span>Mein Profil</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light d-flex align-items-center" href="#">
            <i class="fas fa-info-circle me-2"></i> <span>Chef-Informationen</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light d-flex align-items-center" href="/mydishes">
            <i class="fas fa-utensils me-2"></i> <span>Mein Essen</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light d-flex align-items-center" href="#">
            <i class="fas fa-cogs me-2"></i> <span>Essensverwaltung</span>
          </a>
        </li>
      </ul>

      <!-- Home, Abmelden  -->
       <div class="mt-auto">
          <a class="nav-link text-light d-flex align-items-center btn btn-secondary mb-2" href="#">
            <i class="fas fa-home me-2"></i> <span>Home</span>
          </a>
          <a class="nav-link text-light d-flex align-items-center btn btn-danger logout-btn" href="/">
            <i class="fas fa-sign-out-alt me-2"></i> <span>Abmelden</span>
          </a>
      </div>
    </div>

     <!-- Hauptinhalt -->
     <div class="content p-4 flex-grow-1">
     

      <div>
        <MyDishes />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  /* Sidebar-Stile */
  width: 250px;
  background-color: #333;
  padding: 20px;
  position: fixed; /* Sidebar fixiert an der Seite */
  height: 100%; 
  top: 0; 
  left: 0; 
  bottom: 0; /* Unterkante */
}

.content {
  margin-left: 250px; 
  padding: 20px;
  overflow-y: auto; /* Ermöglicht das Scrollen im Content-Bereich */
  height: 100vh; 
}

.sidebar a {
  color: white; /* Standardfarbe für Links */
  text-decoration: none;
}

.sidebar .nav-link:hover:not(.logout-btn) {
  color: #fd7e14 !important; 
}

</style>
