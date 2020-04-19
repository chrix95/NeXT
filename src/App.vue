<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <TopNav v-if="isUserLoggedIn" />
    <div class="container-fluid" :class="isUserLoggedIn ? 'sb2' : ''">
      <div class="row">
        <SideNav v-if="isUserLoggedIn" />
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import TopNav from "@/components/_partials/TopNavbar";
import SideNav from "@/components/_partials/SideNavbar";
import { mapState } from "vuex";
export default {
  computed: mapState(["isUserLoggedIn"]),
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "NXT |",
    meta: [
      { charset: "utf-8" },
      { name: "description", content: "We are close" },
      { name: "keywords", content: "BRB" },
      { name: "author", content: "nxt.com" }
    ]
  },
  components: {
    TopNav,
    SideNav,
  },
};
</script>
<style></style>
