<template>
  <div class="blarg-details container">
    <div class="row d-flex justify-content-center">
      <div class="col-6 text-center blarg-bg">
        <h4>Title: {{blarg.title}}</h4>
        <h5>Creator: {{blarg.creatorEmail}}</h5>
        <h2>Body: "{{blarg.body}}"</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-9"></div>
    </div>
  </div>
</template>


<script>
export default {
  name: "blarg-details",
  mounted() {
    this.$store.dispatch("getBlargDetails", this.$route.params.id);
  },

  data() {
    return {};
  },
  computed: {
    blarg() {
      return this.$store.state.activeBlarg.blog;
    },
    comments() {
      return this.$store.state.activeBlarg.comments;
    }
  },
  methods: {
    beforeRouteLeave(to, from, next) {
      this.$store.commit("setActiveBlarg", {});
      next();
    }
  },
  components: {}
};
</script>


<style scoped>
.blarg-bg {
  background-color: rgb(65, 184, 131);
}
</style>