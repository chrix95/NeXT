<template>
  <div class="app-main__inner">
    <breadcrumb />
    <div class="row justify-content-lg-center">
      <div class="col-lg-8">
        <div class="main-card mb-3 card">
          <div class="card-body">
            <form @submit.prevent="updateAdmin()">
              <div class="form-row">
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="phone" class="">Phone</label
                    ><input
                      name="phone"
                      type="text"
                      v-model="field.phone"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="phone" class="">Gender</label>
                    <select class="mb-2 form-control" v-model="field.gender">
                      <option>Select an option</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="dob" class="">Date of Birth</label
                    ><input
                      name="dob"
                      type="date"
                      v-model="field.dob"
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
import AdminSettingsService from "@/services/AdminSettingsService";
import Breadcrumb from "@/components/_partials/Breadcrumb";
import { mapState } from "vuex";
export default {
  name: "UpdateProfile",
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
    Breadcrumb
  },
  computed: {
    ...mapState(["user"])
  },
  mounted() {
    this.field.dob = this.user.dob.substr(0, 10);
    this.field.phone = this.user.phone;
    this.field.gender = this.user.gender;
  },
  data() {
    return {
      loading: false,
      field: {
        dob: "",
        phone: "",
        gender: ""
      }
    };
  },
  methods: {
    updateAdmin() {
      if (this.validateUpdate()) {
        this.loading = true;
        if (navigator.onLine) {
          AdminSettingsService.update_profile(this.field)
            .then(result => {
              this.loading = false;
              if (result.data.status == 1) {
                this.$store.dispatch("updateUserData", result.data.data);
                this.$fire({
                  title: "Profile update",
                  text: "Your profile has been updated successfully",
                  type: "success"
                });
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
      if (this.field.phone && this.field.phone.toString().length === 11) {
        if (this.field.gender) {
          if (this.field.dob) {
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
            title: "Gender is required"
          });
        }
      } else {
        this.$fire({
          type: "warning",
          title: "Phone number must be 11 digits"
        });
      }
    }
  }
};
</script>
<style scoped></style>
