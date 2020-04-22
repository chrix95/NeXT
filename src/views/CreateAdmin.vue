<template>
  <div class="app-main__inner">
    <breadcrumb />
    <div class="row">
      <div class="col-lg-12">
        <div class="main-card mb-3 card">
          <div class="card-body">
            <!-- <h5 class="card-title">Grid Rows</h5> -->
            <form @submit.prevent="createAdmin()">
              <div class="form-row">
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="Username" class="">Username</label
                    ><input
                      name="username"
                      placeholder="with a placeholder"
                      v-model="user.username"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="email" class="">Email</label
                    ><input
                      name="email"
                      placeholder="with a placeholder"
                      v-model="user.email"
                      type="email"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="password" class="">Password</label
                    ><input
                      name="password"
                      placeholder="password placeholder"
                      v-model="user.password"
                      type="password"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="confirmPassword" class="">
                      Confirm Password</label
                    ><input
                      name="confirmPassword"
                      placeholder="confirm password placeholder"
                      v-model="user.confirm_password"
                      type="password"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-3">
                  <div class="position-relative form-group">
                    <label for="phone" class="">Phone</label
                    ><input
                      name="phone"
                      type="text"
                      v-model="user.phone"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="position-relative form-group">
                    <label for="phone" class="">Gender</label>
                    <select class="mb-2 form-control" v-model="user.gender">
                      <option>Select an option</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="position-relative form-group">
                    <label for="phone" class="">Admin Type</label>
                    <select class="mb-2 form-control" v-model="user.type">
                      <option>Select an option</option>
                      <option value="super">Super Admin</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="position-relative form-group">
                    <label for="dob" class="">Date of Birth</label
                    ><input
                      name="dob"
                      type="date"
                      v-model="user.dob"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div v-if="!loading">
                <button type="submit" class="mt-2 btn btn-primary">
                  Create Admin
                </button>
              </div>
              <div v-else>
                <loading />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-undef */
import AdminService from "@/services/AdminService";
import Breadcrumb from "@/components/_partials/Breadcrumb";
import Loading from "@/components/_partials/Loading";
export default {
  name: "CreateAdmin",
  metaInfo: {
    // all titles will be injected into this template
    titleTemplate: "%s | Dashboard",
    meta: [
      {
        name: "description",
        content: "We are coming soon",
      },
      {
        name: "keywords",
        content: "We will fix this soon",
      },
    ],
  },
  components: {
    Breadcrumb,
    Loading,
  },
  mounted() {},
  data() {
    return {
      loading: false,
      user: {
        username: "",
        password: "",
        confirm_password: "",
        dob: "",
        email: "",
        type: "",
        phone: "",
        gender: ""
      }
    };
  },
  methods: {
    createAdmin() {
      if (navigator.onLine) {
        this.loading = true;
        AdminService.create_admin()
          .then((result) => {
            this.admins = result.data.data;
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            console.log(err.response);
            NProgress.done();
            if (err.response === undefined) {
              this.$fire("Oops! took long to get a response");
            }
            if (err.response && err.response.status === 401) {
              this.$fire("Oops! " + err.response.data.message);
            }
          });
      } else {
        this.$fire({
          title: "Network Error",
          text: "Please check your internet connection and try again",
          type: "error"
        });
      }
    }
  }
};
</script>
<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
