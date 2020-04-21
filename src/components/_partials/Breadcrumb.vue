<template>
  <div class="sb2-2-2">
    <ul>
      <li>
        <router-link to="/dashboard"
          ><i class="fa fa-home" aria-hidden="true"></i> Home</router-link
        >
      </li>
      <li class="active-bre">
        <a href="#" class="capitalize"> {{ name }}</a>
      </li>
      <li class="page-back">
        <a href="#"><i class="fa fa-backward" aria-hidden="true"></i> Back</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    name() {
      return this.$route.name;
    }
  },
  methods: {}
};
</script>
<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
