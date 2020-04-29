<template>
  <div class="app-sidebar sidebar-shadow">
    <div class="app-header__logo">
      <router-link to="/">
        <div class="logo-src"></div>
      </router-link>
      <div class="header__pane ml-auto">
        <div>
          <button
            type="button"
            class="hamburger close-sidebar-btn hamburger--elastic"
            data-class="closed-sidebar"
          >
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="app-header__mobile-menu">
      <div>
        <button
          type="button"
          class="hamburger hamburger--elastic mobile-toggle-nav"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div class="app-header__menu">
      <span>
        <button
          type="button"
          class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
        >
          <span class="btn-icon-wrapper">
            <i class="fa fa-ellipsis-v fa-w-6"></i>
          </span>
        </button>
      </span>
    </div>
    <div class="scrollbar-sidebar">
      <div class="app-sidebar__inner">
        <ul class="vertical-nav-menu">
          <li class="app-sidebar__heading">Dashboard</li>
          <li>
            <a
              href="#/dashboard"
              :class="$route.path == '/dashboard' ? 'mm-active' : ''"
            >
              <i class="metismenu-icon pe-7s-rocket"></i>
              Dashboard
            </a>
          </li>
          <li
            class="app-sidebar__heading"
            v-if="$store.state.userType == 'super'"
          >
            Admin Module
          </li>
          <li v-if="$store.state.userType == 'super'">
            <a href="#">
              <i class="metismenu-icon pe-7s-config"></i>
              Admin Module
              <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </a>
            <ul>
              <li>
                <a
                  href="#/all-admin"
                  :class="$route.path == '/all-admin' ? 'mm-active' : ''"
                >
                  All Admin
                </a>
              </li>
              <li>
                <a
                  href="#/create-admin"
                  :class="$route.path == '/create-admin' ? 'mm-active' : ''"
                >
                  <i class="metismenu-icon"> </i>Create Admin
                </a>
              </li>
            </ul>
          </li>
          <li
            class="app-sidebar__heading"
            v-if="$store.state.userType == 'admin'"
          >
            Settings
          </li>
          <li v-if="$store.state.userType == 'admin'">
            <a
              href="#/update-profile"
              :class="$route.path == '/update-profile' ? 'mm-active' : ''"
            >
              <i class="metismenu-icon pe-7s-user"> </i>Update Profile
            </a>
          </li>
          <li v-if="$store.state.userType == 'admin'">
            <a
              href="#/change-password"
              :class="$route.path == '/change-password' ? 'mm-active' : ''"
            >
              <i class="metismenu-icon pe-7s-door-lock"> </i>Change Password
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user", "userType"]),
    currentRoute() {
      return this.$route.name;
    }
  }
};
</script>
<style scoped></style>
