<template>
  <div id="app">
    <navbar />
    <router-view />
    <!-- <footer class="container-fluid fixed-bottom bg-dark">
      <div class="row">
        <div class="col-12 text-center text-white">
          <p>Made with Love</p>
        </div>
      </div>
    </footer>-->
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import { onAuth } from "@bcwdev/auth0-vue";
import { setBearer, api } from "./store/AxiosStore";
export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    if (this.$auth.isAuthenticated) {
      setBearer(this.$auth.bearer);
      //NOTE if you want to do something everytime the user logs in, do so here
    }
  },
  components: {
    Navbar
  }
};
</script>
<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";
</style>
<style lang="css">
@import "./assets/style.css";
</style>
