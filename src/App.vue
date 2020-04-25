<template>
  <div id="app">
    <div
      class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header"
      v-if="isUserLoggedIn"
    >
      <top-nav />
      <theme-settings />
      <div class="app-main">
        <side-nav />
        <div class="app-main__outer">
          <router-view />
          <footer-bottom />
        </div>
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
<script>
import TopNav from "@/components/_partials/TopNavbar";
import ThemeSettings from "@/components/_partials/ThemeSettings";
import SideNav from "@/components/_partials/SideNavbar";
import FooterBottom from "@/components/_partials/FooterBottom";
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
    ThemeSettings,
    SideNav,
    FooterBottom
  }
};
</script>
<style>
.capitalize {
  text-transform: capitalize;
}
/* .swal2-styled.swal2-confirm {
  font-size: 0.8em;
}
.swal2-title {
  font-size: 1.4em;
}
.swal2-content {
  font-size: 0.9em;
} */
.swal2-popup {
  font-size: 0.8rem !important;
}
@media (max-width: 768px) {
  .swal2-popup {
    font-size: 0.5rem !important;
  }
}
</style>
