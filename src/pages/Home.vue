<template>
  <div class="home container">
    <div class="row d-flex justify-content-center my-3">
      <div class="col-7 text-center text-white mb-2">
        <h1 class="welcome-shadow">Welcome To Blarggr</h1>
        <p>Create a blarg or see what others are saying!</p>
      </div>
      <div class="col-7 d-flex justify-content-center">
        <button
          class="btn success-button"
          v-if="$auth.isAuthenticated"
          @click="blargForm = !blargForm"
        >Create a Blarg!</button>
      </div>
      <div class="col-12 d-flex justify-content-center my-5" v-if="blargForm">
        <form class="form-inline" @submit.prevent="showCreateAlert">
          <div class="form-group">
            <label for="input1" class="text-white">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              class="form-control ml-1 mr-3"
              placeholder="Title..."
              aria-describedby="helpId"
              v-model="newBlarg.title"
            />
            <!-- <input
              type="text"
              name="body"
              id="body"
              class="form-control mx-3 text-box"
              placeholder="Type your blarg here..."
              aria-describedby="helpId"
              v-model="newBlarg.body"
            />-->
            <div class="form-group">
              <label for="exampleFormControlTextarea1" class="text-white">Blarg Body:</label>
              <textarea
                class="form-control ml-1 mr-3"
                v-model="newBlarg.body"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <button typ="submit" class="btn success-button">Post</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <blarg v-for="blarg in blargs" :key="blarg.id" :blarg="blarg" />
      </div>
    </div>
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
    },
    showCreateAlert() {
      swal({
        title: "Are you sure?",
        text: "Once you post this Blarg, everyone will be able to see it!",
        icon: "info",
        buttons: true
      }).then(willCreate => {
        if (willCreate) {
          swal("Your blarg has been posted", {
            icon: "success"
          });
          this.createBlarg();
        }
      });
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
.text-box {
  overflow-y: auto;
  height: 10vh;
}
.welcome-shadow {
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.1);
}
</style>
