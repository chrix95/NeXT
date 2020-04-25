<template>
  <div class="app-main__inner">
    <breadcrumb />
    <div class="row">
      <div class="col-lg-12">
        <div class="main-card mb-3 card">
          <div class="card-body">
            <!-- <h5 class="card-title">Grid Rows</h5> -->
            <form @submit.prevent="updateAdmin()">
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
                      v-model="confirm_password"
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
                  Update Admin
                </button>
              </div>
              <div v-else>
                <button type="submit" class="mt-2 btn btn-primary" disabled>
                  Loading...
                </button>
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
export default {
  name: "EditAdminSuper",
  metaInfo: {
    // all titles will be injected into this template
    titleTemplate: "%s | Dashboard",
    meta: [
      {
        name: "description",
        content: "We are coming soon"
      },
      {
        name: "keywords",
        content: "We will fix this soon"
      }
    ]
  },
  props: ["id"],
  components: {
    Breadcrumb
  },
  mounted() {
    this.getOneAdmin(this.id);
  },
  data() {
    return {
      loading: false,
      user: {
        id: "",
        username: "",
        password: "",
        dob: "",
        email: "",
        type: "",
        phone: "",
        gender: ""
      },
      confirm_password: ""
    };
  },
  methods: {
    getOneAdmin(adminId) {
      if (navigator.onLine) {
        AdminService.get_one_admin(adminId)
          .then(result => {
            this.user.id = result.data.data.id;
            this.user.phone = result.data.data.phone;
            this.user.username = result.data.data.username;
            this.user.email = result.data.data.email;
            this.user.dob = result.data.data.dob.substr(0, 10);
            this.user.gender = result.data.data.gender;
            this.user.type = result.data.data.type;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            console.log(err.response);
            NProgress.done();
            if (err.response === undefined) {
              this.$fire("Oops! took long to get a response");
            }
            if (err.response && err.response.data.status === -1) {
              this.$fire("Oops! " + err.response.data.message);
              setTimeout(() => {
                this.$router.push({
                  name: "All Admin"
                });
              }, 2000);
            }
            if (err.response && err.response.status === 401) {
              this.$fire("Oops! " + err.response.data.message);
              setTimeout(() => {
                this.$store.dispatch("logout");
              }, 3000);
            }
          });
      } else {
        this.loading = false;
        this.$fire({
          title: "Network Error",
          text: "Please check your internet connection and try again",
          type: "error"
        });
      }
    },
    updateAdmin() {
      if (this.validateUpdate()) {
        this.loading = true;
        if (navigator.onLine) {
          AdminService.update_admin_by_superadmin(this.user)
            .then(() => {
              this.$router.push({
                name: "All Admin"
              });
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              NProgress.done();
              if (err.response === undefined) {
                this.$fire("Oops! took long to get a response");
              }
              if (err.response && err.response.data.status === -1) {
                this.$fire("Oops! " + err.response.data.message);
              }
              if (err.response && err.response.status === 401) {
                this.$fire("Oops! " + err.response.data.message);
                setTimeout(() => {
                  this.$store.dispatch("logout");
                }, 3000);
              }
            });
        } else {
          this.loading = false;
          this.$fire({
            title: "Network Error",
            text: "Please check your internet connection and try again",
            type: "error"
          });
        }
      }
    },
    validateUpdate() {
      if (this.user.username) {
        if (this.user.email) {
          if (this.user.password) {
            if (this.user.password == this.confirm_password) {
              if (this.user.phone && this.user.phone.toString().length === 11) {
                if (this.user.gender) {
                  if (this.user.type) {
                    if (this.user.dob) {
                      return true;
                    } else {
                      this.$fire({
                        type: "warning",
                        title: "Enter date of birth"
                      });
                    }
                  } else {
                    this.$fire({
                      type: "warning",
                      title: "Admin type is required"
                    });
                  }
                } else {
                  this.$fire({
                    type: "warning",
                    title: "Gender is required"
                  });
                }
              } else {
                this.$fire({
                  type: "warning",
                  title: "Phone number must be 11 digits"
                });
              }
            } else {
              this.$fire({
                type: "warning",
                title: "Confirm password doesn't match"
              });
            }
          } else {
            this.$fire({
              type: "warning",
              title: "Password is required"
            });
          }
        } else {
          this.$fire({
            type: "warning",
            title: "Email is required"
          });
        }
      } else {
        this.$fire({
          type: "warning",
          title: "Username is required"
        });
      }
    }
  }
};
</script>
<style scoped></style>
