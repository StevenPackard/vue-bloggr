<template>
  <div
    class="profile-blargs-component col-8 border blarg-bg text-center my-2 blarg-wide blarg-shadow"
  >
    <h3>{{ blarg.title }}</h3>
    <div class="row d-flex justify-content-center">
      <router-link :to="{ name: 'BlargDetails', params: { id: blarg.id } }">
        <button class="btn btn-primary mx-2 mb-2">Go to Blarg</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile-blargs",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
  props: ["blarg"]
};
</script>

<style scoped>
.blarg-bg {
  background-color: rgb(65, 184, 131);
}
.blarg-wide {
  width: 50vh;
}
.blarg-shadow {
  box-shadow: 3px 3px;
}
</style>
