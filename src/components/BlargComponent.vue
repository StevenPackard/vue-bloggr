<template>
  <div class="blarg-component">
    <router-link :to="{ name: 'BlargDetails', params: { id: blarg._id }}">
      <div class="row d-flex justify-content-center">
        <div class="col-7 d-flex align-items-center justify-content-center blarg-bg border my-2">
          <h3 class="mx-2">{{blarg.title}}</h3>
          <h5 class="mx-2">~ {{blarg.creatorEmail}}</h5>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "blarg-component",
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
</style>