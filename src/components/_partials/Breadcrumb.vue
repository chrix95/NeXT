<template>
  <div class="app-page-title">
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon">
          <i class="pe-7s-car icon-gradient bg-mean-fruit"> </i>
        </div>
        <div>
          {{ name }}
        </div>
      </div>
    </div>
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
<style scoped></style>
