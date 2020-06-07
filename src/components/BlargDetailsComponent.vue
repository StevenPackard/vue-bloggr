<template>
  <div class="blarg-details-component row d-flex justify-content-center mt-2">
    <div class="col-6 text-center blarg-bg">
      <h4>Title: {{ blarg.title }}</h4>
      <h5>Creator: {{ blarg.creatorEmail }}</h5>
    </div>
    <div
      class="col-7 text-center blarg-body-bg border mt-2 blarg-tall d-flex align-items-center justify-content-center rounded-blarg"
    >
      <h2>"{{ blarg.body }}"</h2>
    </div>
    <div class="col-7 d-flex justify-content-center my-2">
      <button
        class="btn btn-danger mx-2"
        v-if="isCreator"
        @click="showDeleteAlert"
      >
        Delete Blarg
      </button>
      <button
        class="btn success-button mx-2"
        v-if="isCreator"
        @click="editForm = !editForm"
      >
        Edit Blarg
      </button>
    </div>
    <div class="col-7 d-flex justify-content-center my-3" v-if="editForm">
      <form class="form-inline" @submit.prevent="sendEdit">
        <div class="form-group">
          <input
            type="text"
            name="title"
            id="title"
            class="form-control mx-3"
            placeholder="Edit Title..."
            aria-describedby="helpId"
            v-model="editBlarg.title"
          />
          <input
            type="text"
            name="body"
            id="body"
            class="form-control mx-3"
            placeholder="Edit Blarg..."
            aria-describedby="helpId"
            v-model="editBlarg.body"
          />
          <button typ="submit" class="btn success-button">Edit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "blarg-details-component",
  mounted() {
    this.$store.dispatch("getBlargDetails");
  },
  data() {
    return {
      editForm: false,
      editBlarg: {
        id: this.$route.params.id,
      },
    };
  },
  computed: {
    isCreator() {
      return this.$store.state.profile.email == this.blarg.creatorEmail;
    },
  },
  methods: {
    sendEdit() {
      this.$store.dispatch("editBlarg", { ...this.editBlarg });
      this.editBlarg = {
        id: this.$route.params.id,
      };
    },
    deleteBlarg() {
      this.$store.dispatch("deleteBlarg", this.$route.params.id);
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
          swal("Poof! Your blarg has been deleted!", {
            icon: "success",
          });
          this.deleteBlarg();
        } else {
          swal("Your blarg is safe!");
        }
      });
    },
  },
  components: {},
  props: ["blarg"],
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
