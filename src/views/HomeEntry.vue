<template>
  <HomeView v-if="auth.isAuthenticated" />
  <LandingView v-else />
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import HomeView from './HomeView.vue'
import LandingView from './LandingView.vue'

const auth = useAuthStore()
</script>
