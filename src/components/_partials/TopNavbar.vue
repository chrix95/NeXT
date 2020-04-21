<template>
  <div class="container-fluid sb1">
    <div class="row">
      <!--== LOGO ==-->
      <div class="col-md-2 col-sm-3 col-xs-6 sb1-1">
        <a href="#" class="btn-close-menu"
          ><i class="fa fa-times" aria-hidden="true"></i
        ></a>
        <a href="#" class="atab-menu"
          ><i class="fa fa-bars tab-menu" aria-hidden="true"></i
        ></a>
        <router-link to="/dashboard" class="logo"
          ><img src="images/logo1.png" alt="" />
        </router-link>
      </div>
      <!--== SEARCH ==-->
      <div class="col-md-6 col-sm-6 mob-hide">
        <form class="app-search">
          <input type="text" placeholder="Search..." class="form-control" />
          <a href="#"><i class="fa fa-search"></i></a>
        </form>
      </div>
      <!--== NOTIFICATION ==-->
      <div class="col-md-2 tab-hide">
        <div class="top-not-cen">
          <a
            class="waves-effect btn-noti"
            href="admin-all-enquiry.html"
            title="all enquiry messages"
            ><i class="fa fa-commenting-o" aria-hidden="true"></i
            ><span>5</span></a
          >
          <a
            class="waves-effect btn-noti"
            href="admin-course-enquiry.html"
            title="course booking messages"
            ><i class="fa fa-envelope-o" aria-hidden="true"></i
            ><span>5</span></a
          >
          <a
            class="waves-effect btn-noti"
            href="admin-admission-enquiry.html"
            title="admission enquiry"
            ><i class="fa fa-tag" aria-hidden="true"></i><span>5</span></a
          >
        </div>
      </div>
      <!--== MY ACCCOUNT ==-->
      <div class="col-md-2 col-sm-3 col-xs-6">
        <!-- Dropdown Trigger -->
        <a
          class="waves-effect dropdown-button top-user-pro"
          href="#"
          data-activates="top-menu"
          ><img src="images/user/6.png" alt="" />My Account
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </a>

        <!-- Dropdown Structure -->
        <ul
          id="top-menu"
          class="dropdown-content top-menu-sty"
          :class="active ? 'active' : ''"
        >
          <li>
            <a href="admin-panel-setting.html" class="waves-effect"
              ><i class="fa fa-cogs" aria-hidden="true"></i>Admin Setting</a
            >
          </li>
          <li class="divider"></li>
          <li>
            <a
              href="#"
              class="ho-dr-con-last waves-effect"
              @click.prevent="logout()"
              ><i class="fa fa-sign-in" aria-hidden="true"></i> Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
<style scoped>
.active {
  display: block;
  opacity: 1;
}
</style>
