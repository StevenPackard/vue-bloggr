<template>
  <div class="blarg-component">
    <router-link :to="{ name: 'BlargDetails', params: { id: blarg._id }}">
      <div class="row d-flex justify-content-center">
        <div
          class="col-8 d-flex align-items-center justify-content-center blarg-bg border my-2 blarg-short blarg-shadow"
        >
          <h3 class="mx-2">
            <b>{{blarg.title}}</b>
          </h3>
          <h5 class="mx-2">by: {{blarg.creatorEmail}}</h5>
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
.blarg-short {
  min-height: 10vh;
}
.blarg-shadow {
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
}
</style>