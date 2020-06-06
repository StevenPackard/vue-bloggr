<template>
  <div class="blarg-details container">
    <div class="row d-flex justify-content-center my-3">
      <div class="col-6 text-center blarg-bg">
        <h4>Title: {{blarg.title}}</h4>
        <h5>Creator: {{blarg.creatorEmail}}</h5>
        <h2>Body: "{{blarg.body}}"</h2>
      </div>
      <div class="col-7 d-flex justify-content-center mt-2">
        <button class="btn btn-danger" v-if="isCreator" @click="deleteBlarg">Delete Blarg</button>
      </div>
    </div>
    <div class="row d-flex justify-content-center my-2">
      <div class="col-6 d-flex justify-content-center">
        <button
          class="btn success-button"
          @click="commentForm = !commentForm"
        >Show {{comments.length}} Comments!</button>
      </div>
    </div>
    <div class="row d-flex justify-content-center" v-if="commentForm">
      <div class="col-7 d-flex justify-content-center">
        <form class="form-inline" @submit.prevent="createComment">
          <div class="form-group">
            <input
              type="text"
              name="body"
              id="body"
              class="form-control"
              placeholder="Type comment here..."
              aria-describedby="helpId"
              v-model="newComment.body"
            />
          </div>
          <button type="submit" class="btn success-button mx-2">Submit</button>
        </form>
      </div>
      <comment v-for="comment in comments" :key="comment.blogId" :comment="comment" />
    </div>
  </div>
</template>


<script>
import Comment from "@/components/CommentsComponent.vue";
export default {
  name: "blarg-details",
  mounted() {
    this.$store.dispatch("getBlargDetails", this.$route.params.id);
    this.$store.dispatch("getComments", this.$route.params.id);
    this.$store.dispatch("getProfile");
  },

  data() {
    return {
      newComment: {
        blogId: this.$route.params.id
      },
      commentForm: false
    };
  },
  computed: {
    blarg() {
      return this.$store.state.activeBlarg.blog;
    },
    comments() {
      return this.$store.state.comments;
    },
    isCreator() {
      return this.$store.state.profile.email == this.blarg.creatorEmail;
    }
  },
  methods: {
    beforeRouteLeave(to, from, next) {
      this.$store.commit("setActiveBlarg", {});
      next();
    },
    createComment() {
      this.$store.dispatch("createComment", { ...this.newComment });
      this.newComment = {
        blogId: this.$route.params.id
      };
    },
    deleteBlarg() {
      this.$store.dispatch("deleteBlarg", this.$route.params.id);
    }
  },
  components: {
    Comment
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