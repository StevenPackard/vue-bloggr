<template>
  <div class="home container">
    <div class="row d-flex justify-content-center my-3">
      <div class="col-7 text-center text-white mb-2">
        <h1>Welcome To Blarggr</h1>
      </div>
      <div class="col-7 d-flex justify-content-center">
        <button
          class="btn success-button"
          v-if="$auth.isAuthenticated"
          @click="blargForm = !blargForm"
        >Create a Blarg!</button>
      </div>
      <div class="col-12 d-flex justify-content-center my-5" v-if="blargForm">
        <form class="form-inline" @submit.prevent="createBlarg">
          <div class="form-group">
            <input
              type="text"
              name="title"
              id="title"
              class="form-control mx-3"
              placeholder="Title..."
              aria-describedby="helpId"
              v-model="newBlarg.title"
            />
            <input
              type="text"
              name="body"
              id="body"
              class="form-control mx-3"
              placeholder="Type your blarg here..."
              aria-describedby="helpId"
              v-model="newBlarg.body"
            />
            <button typ="submit" class="btn success-button">Post</button>
          </div>
        </form>
      </div>
    </div>
    <blarg v-for="blarg in blargs" :key="blarg.id" :blarg="blarg" />
  </div>
</template>

<script>
import Blarg from "@/components/BlargComponent.vue";
export default {
  name: "home",

  mounted() {
    this.$store.dispatch("getAllBlargs");
  },

  data() {
    return {
      blargForm: false,
      newBlarg: {}
    };
  },

  computed: {
    blargs() {
      return this.$store.state.blargs;
    },
    profile() {
      return this.$store.state.profile;
    }
  },

  methods: {
    createBlarg() {
      this.$store.dispatch("createBlarg", { ...this.newBlarg });
      this.newBlarg = {};
    }
  },

  components: {
    Blarg
  }
};
</script>

<style scoped>
.blarg-bg {
  background-color: rgb(65, 184, 131);
}
.success-button {
  background-color: rgb(65, 184, 131);
}
</style>
