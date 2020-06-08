<template>
  <div
    class="comments-component col-7 blarg-body-bg border mt-3 text-center d-flex flex-column align-items-center blarg-shadow"
  >
    <h3>"{{ comment.body }}"</h3>
    <p>
      <b>{{ comment.creatorEmail }}</b>
    </p>
    <div class="row d-flex justify-content-center">
      <div class="col-6 d-flex justify-content-center">
        <button class="btn btn-danger mb-1 mx-2" v-if="isCreator" @click="showDeleteComment">Delete</button>
        <button
          class="btn success-button mb-1 mx-2"
          v-if="isCreator"
          @click="editForm = !editForm"
        >Edit</button>
      </div>
      <div class="col-12 d-flex justify-content-center mb-2" v-if="editForm">
        <form class="form-inline" @submit.prevent="sendEditComment">
          <div class="form-group">
            <input
              type="text"
              name="body"
              id="body"
              class="form-control"
              placeholder="Type comment here..."
              v-model="editComment.body"
            />
          </div>
          <button class="btn success-button" type="submit">Edit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comments-component",
  data() {
    return {
      editForm: false,
      editComment: {
        id: this.comment.id,
        blogId: this.comment.blogId
      }
    };
  },
  computed: {
    isCreator() {
      return this.$store.state.profile.email == this.comment.creatorEmail;
    }
  },
  methods: {
    showDeleteComment() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this comment!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          swal("Your comment has been deleted!", {
            icon: "success"
          });
          this.deleteComment();
        } else {
          swal("Your comment is safe!");
        }
      });
    },
    deleteComment() {
      this.$store.dispatch("deleteComment", this.comment.id);
    },
    sendEditComment() {
      this.$store.dispatch("editComment", { ...this.editComment });
      this.editComment = {
        id: this.comment.id,
        blogId: this.comment.blogId
      };
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
.blarg-shadow {
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
}
</style>
