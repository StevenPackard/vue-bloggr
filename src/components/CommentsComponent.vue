<template>
  <div
    class="comments-component col-7 blarg-body-bg border mt-3 text-center d-flex flex-column align-items-center"
  >
    <h3>"{{comment.body}}"</h3>
    <p>
      <b>{{comment.creatorEmail}}</b>
    </p>
    <div class="row">
      <div class="col6">
        <button class="btn btn-danger mb-1" v-if="isCreator" @click="deleteComment">Delete</button>
      </div>
      <div class="col-6">
        <button class="btn success-button mb-1" v-if="isCreator">Edit</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "comments-component",
  data() {
    return {};
  },
  computed: {
    isCreator() {
      return this.$store.state.profile.email == this.comment.creatorEmail;
    }
  },
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.comment.id);
    }
  },
  components: {},
  props: ["comment"]
};
</script>


<style scoped>
.blarg-bg {
  background-color: rgb(65, 184, 131);
}
.blarg-body-bg {
  background-color: rgb(128, 140, 138);
}
.success-button {
  background-color: rgb(65, 184, 131);
}
</style>