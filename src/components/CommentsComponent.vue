<template>
  <div class="comments-component col-7 blarg-bg border mt-3 text-center">
    <h3>{{comment.body}}</h3>
    <p>{{comment.creatorEmail}}</p>
    <button class="btn btn-outline-danger" v-if="isCreator" @click="deleteComment">Delete</button>
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
</style>