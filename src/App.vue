<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="nav">
    <div class="container">
      <nav class="navbar">
        <a class="navbar-brand" href="../list">To Do List!</a>
      </nav>
    </div>
  </div>
  
  <RouterView />
</template>
