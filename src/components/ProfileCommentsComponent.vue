<template>
  <div
    class="profile-comments-component col-9 border text-center my-2 blarg-body-bg comment-wide"
  >
    <h3>"{{ comment.body }}"</h3>
    <div class="row d-flex justify-content-center mb-2">
      <router-link
        :to="{ name: 'BlargDetails', params: { id: comment.blogId } }"
      >
        <button class="btn btn-primary mx-2">Go to Blarg</button>
      </router-link>
      <button class="btn btn-danger" @click="showDeleteComment">Delete</button>
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
    showDeleteComment() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this comment!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Your comment has been deleted!", {
            icon: "success",
          });
          this.deleteComment();
        } else {
          swal("Your comment is safe!");
        }
      });
    },
    deleteComment() {
      this.$store.dispatch("deleteProfileComment", this.comment.id);
    },
  },
  components: {},
  props: ["comment"],
};
</script>

<style scoped>
.blarg-bg {
  background-color: rgb(65, 184, 131);
}
.blarg-body-bg {
  background-color: rgb(128, 140, 138);
}
.comment-wide {
  min-width: 40vh;
}
</style>
