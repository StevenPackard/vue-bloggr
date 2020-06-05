<template>
  <div class="comments-component col-7 blarg-bg border mt-3 text-center">
    <h3>{{comment.body}}</h3>
    <p>{{comment.creatorEmail}}</p>
  </div>
</template>


<script>
export default {
  name: "comments-component",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
  props: ["comment"]
};
</script>


<style scoped>
.blarg-bg {
  background-color: rgb(65, 184, 131);
}
</style>