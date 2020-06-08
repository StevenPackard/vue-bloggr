<template>
  <div class="about">
    <div class="row d-flex justify-content-center">
      <div
        class="col-6 d-flex flex-column align-items-center blarg-bg my-3 border profile-tall justify-content-center"
      >
        <h1 class="welcome-shadow">Hello {{profile.name}}!</h1>
        <img class="rounded" :src="profile.picture" alt />
        <p>{{ profile.email }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-6 d-flex flex-column align-items-center">
        <button
          class="btn success-button button-shrink"
          @click="blargShow = !blargShow"
        >Show your Blargs</button>
        <div class="row d-flex justify-content-center" v-if="blargShow">
          <blarg v-for="blarg in myBlargs" :key="blarg.id" :blarg="blarg" />
        </div>
      </div>
      <div class="col-6 d-flex flex-column align-items-center">
        <button
          class="btn success-button button-shrink"
          @click="commentShow = !commentShow"
        >Show your Comments</button>
        <div class="row d-flex justify-content-center my-2" v-if="commentShow">
          <comment v-for="comment in myComments" :key="comment.id" :comment="comment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Blarg from "@/components/ProfileBlargsComponent.vue";
import Comment from "@/components/ProfileCommentsComponent.vue";
export default {
  name: "Profile",
  data() {
    return {
      blargShow: false,
      commentShow: false
    };
  },
  mounted() {
    this.$store.dispatch("getMyBlargs");
    this.$store.dispatch("getMyComments");
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    myBlargs() {
      return this.$store.state.myBlargs;
    },
    myComments() {
      return this.$store.state.myComments;
    }
  },
  methods: {
    beforeRouteLeave(to, from, next) {
      this.$store.commit("setMyComments", {});
      next();
    }
  },
  components: {
    Blarg,
    Comment
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
.success-button {
  background-color: rgb(65, 184, 131);
}

.button-shrink {
  width: 40%;
}
.blarg-shadow {
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
}
.welcome-shadow {
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.1);
}
.blarg-bg {
  background-color: rgb(65, 184, 131);
}
.profile-tall {
  min-height: 30vh;
}
</style>
