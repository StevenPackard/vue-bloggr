<template>
  <div class="profile-comments-component col-9 border blarg-bg text-center my-2">
    <h3>"{{comment.body}}"</h3>
    <div class="row d-flex justify-content-center">
      <router-link :to="{ name: 'BlargDetails', params: { id: comment.blogId }}">
        <button class="btn btn-primary mx-2">Go to Blarg</button>
      </router-link>
      <!-- <button class="btn btn-danger mx-2" @click="deleteComment">Delete Comment</button> -->
    </div>
  </div>
</template>


<script>
export default {
  name: "profile-comments",
  data() {
    return {};
  },
  computed: {},
  methods: {
    // deleteComment() {
    //   this.$store.dispatch("deleteComment", this.comment.id);
    // }
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