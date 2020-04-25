<template>
  <div class="app-main__inner">
    <breadcrumb />
    <div class="row justify-content-lg-center">
      <div class="col-lg-8">
        <div class="main-card mb-3 card">
          <div class="card-body">
            <form @submit.prevent="changePassword()">
              <div class="form-row">
                <div class="col-md-12">
                  <div class="position-relative form-group">
                    <label for="phone" class="">Current Password</label
                    ><input
                      name="phone"
                      type="password"
                      v-model="field.old_password"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="position-relative form-group">
                    <label for="phone" class="">New Password</label
                    ><input
                      name="phone"
                      type="password"
                      v-model="field.new_password"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="position-relative form-group">
                    <label for="dob" class="">Confirm new password</label
                    ><input
                      name="dob"
                      type="password"
                      v-model="confirm_password"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div v-if="!loading">
                <button type="submit" class="mt-2 btn btn-primary">
                  Update Password
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
import AdminSettingsService from "@/services/AdminSettingsService";
import Breadcrumb from "@/components/_partials/Breadcrumb";
export default {
  name: "ChangePassword",
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
        content: "We will fix this soon"
      }
    ]
  },
  components: {
    Breadcrumb
  },
  computed: {},
  mounted() {},
  data() {
    return {
      loading: false,
      field: {
        old_password: "",
        new_password: ""
      },
      confirm_password: ""
    };
  },
  methods: {
    changePassword() {
      if (this.validatePasswordChange()) {
        this.loading = true;
        if (navigator.onLine) {
          AdminSettingsService.change_password(this.field)
            .then(result => {
              this.loading = false;
              if (result.data.status == 1) {
                this.$fire({
                  title: "Password update",
                  text: "Your password has been updated successfully",
                  type: "success"
                });
                setTimeout(() => {
                  this.$store.dispatch("logout");
                }, 2500);
              } else {
                this.$fire("Oops! " + result.data.message);
              }
            })
            .catch((err) => {
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
    validatePasswordChange() {
      if (this.field.old_password) {
        if (this.field.new_password) {
          if (this.field.new_password == this.confirm_password) {
            return true;
          } else {
            this.$fire({
              type: "warning",
              title: "Confirm password doesn't match"
            });
          }
        } else {
          this.$fire({
            type: "warning",
            title: "New password is required"
          });
        }
      } else {
        this.$fire({
          type: "warning",
          title: "Old password is required"
        });
      }
    }
  }
};
</script>
<style scoped></style>
