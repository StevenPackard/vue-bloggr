<template>
  <div class="blarg-details container">
    <blarg :blarg="blarg" />
    <div class="row d-flex justify-content-center mb-3">
      <div class="col-6 d-flex justify-content-center">
        <button class="btn success-button" @click="commentForm = !commentForm">
          Show {{ comments.length }} Comments!
        </button>
      </div>
    </div>
    <div class="row d-flex justify-content-center mb-4" v-if="commentForm">
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
      <comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/CommentsComponent.vue";
import Blarg from "@/components/BlargDetailsComponent.vue";
export default {
  name: "blarg-details",
  mounted() {
    this.$store.dispatch("getBlargDetails", this.$route.params.id);
    this.$store.dispatch("getComments", this.$route.params.id);
  },

  data() {
    return {
      editBlarg: {
        id: this.$route.params.id,
      },
      newComment: {
        blogId: this.$route.params.id,
      },
      commentForm: false,
      editForm: false,
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
    },
  },
  methods: {
    beforeRouteLeave(to, from, next) {
      this.$store.commit("setActiveBlarg", {});
      next();
    },
    createComment() {
      this.$store.dispatch("createComment", { ...this.newComment });
      this.newComment = {
        blogId: this.$route.params.id,
      };
    },
    deleteBlarg() {
      this.$store.dispatch("deleteBlarg", this.$route.params.id);
    },
    sendEdit() {
      this.$store.dispatch("editBlarg", { ...this.editBlarg });
      this.$store.dispatch("getBlargDetails");
      this.editBlarg = {
        id: this.$route.params.id,
      };
    },
    showDeleteAlert() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this blarg!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Your blarg has been deleted!", {
            icon: "success",
          });
          this.deleteBlarg();
        } else {
          swal("Your blarg is safe!");
        }
      });
    },
  },

  components: {
    Comment,
    Blarg,
  },
};
</script>

<style scoped>
.blarg-bg {
  background-color: rgb(65, 184, 131);
}

.success-button {
  background-color: rgb(65, 184, 131);
}

.blarg-tall {
  min-height: 40vh;
}
.blarg-body-bg {
  background-color: rgb(128, 140, 138);
}
.rounded-blarg {
  border-radius: 5%;
}
</style>
