<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="Vue logo" src="../assets/logo.png" style="transform: rotate(-90deg);width: 25px;" />
        <img
          alt="Vue logo"
          src="../assets/logo.png"
          style="transform: rotate(-90deg);width: 25px;margin-top: -10px;"
        />
      </div>
      <div>
        <h3 style="color: rgb(65,184,131)">larggr</h3>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link text-white">Home</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }"
        >
          <router-link class="nav-link text-white" :to="{ name: 'Profile' }">Profile</router-link>
        </li>
      </ul>
      <span class="navbar-text">
        <button class="btn success-button" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <button class="btn btn-danger" @click="showLogoutAlert" v-else>logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import { getUserData } from "@bcwdev/auth0-vue";
import { setBearer, api } from "../store/AxiosStore";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      if (this.$auth.isAuthenticated) {
        setBearer(this.$auth.bearer);
        // NOTE if you want to do something everytime the user logs in, do so here
      }
      this.$store.dispatch("getProfile");
    },
    showLogoutAlert() {
      swal({
        title: "Are you sure you want to log out?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willLogOut => {
        if (willLogOut) {
          this.logout();
        }
      });
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    }
  }
};
</script>

<style scoped>
.success-button {
  background-color: rgb(65, 184, 131);
}
</style>
