<template>
  <div class="app-container app-theme-white body-tabs-shadow">
    <div class="app-container">
      <div class="h-100 bg-plum-plate bg-animation">
        <div class="d-flex h-100 justify-content-center align-items-center">
          <div class="mx-auto app-login-box col-md-8">
            <div class="app-logo-inverse mx-auto mb-3"></div>
            <div class="modal-dialog w-100 mx-auto">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="h5 modal-title text-center">
                    <h4 class="mt-2">
                      <div>Welcome back,</div>
                      <span>Please sign in to your account below.</span>
                    </h4>
                  </div>
                  <form class="">
                    <div class="form-row">
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <input
                            name="username"
                            placeholder="Username here..."
                            type="text"
                            v-model="user.username"
                            class="form-control"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <input
                            name="password"
                            placeholder="Password here..."
                            v-model="user.password"
                            type="password"
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer clearfix">
                  <div class="float-right">
                    <button
                      class="btn btn-primary btn-lg"
                      @click.prevent="loginUser()"
                      v-if="!loading"
                    >
                      Login to Dashboard
                    </button>
                    <button
                      class="btn btn-primary btn-lg"
                      @click.prevent="loginUser()"
                      disabled
                      v-else
                    >
                      Loading
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center text-white opacity-8 mt-3">
              Copyright © NXT 2020
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-undef */
import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "Login",
  metaInfo: {
    // all titles will be injected into this template
    titleTemplate: "%s | Login",
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
  beforeMount() {
    if (this.$store.state.isUserLoggedIn) {
      this.$router.push("/dashboard");
    }
  },
  data() {
    return {
      loading: false,
      user: {
        username: "super",
        password: "123456"
      }
    };
  },
  methods: {
    loginUser() {
      if (this.validateLogin()) {
        if (navigator.onLine) {
          this.loading = true;
          AuthenticationService.login(this.user)
            .then(result => {
              console.log(result);
              this.$store.dispatch("login", result.data);
              this.$router.push({
                name: "dashboard"
              });
              location.reload();
            })
            .catch(err => {
              this.loading = false;
              if (err.response === undefined) {
                this.$fire("Oops! took long to get a response");
                NProgress.done();
              }
              this.$fire({
                title: err.response.statusText,
                text: err.response.data.message,
                type: "error"
              });
            });
        } else {
          this.$fire({
            title: "Network Error",
            text: "Please check your internet connection and try again",
            type: "error"
          });
        }
      }
    },
    validateLogin() {
      if (this.user.username) {
        if (this.user.password) {
          return true;
        } else {
          this.$alert("Password is required");
        }
      } else {
        this.$alert("Username is required");
      }
    }
  }
};
</script>
<style scoped>
.bg-plum-plate {
  background-image: linear-gradient(135deg, #eac166 0%, #a2554b 100%) !important;
}
.bg-animation {
  animation: bg-pan-left 60s both;
}
.log-in-pop-right {
  float: left;
  width: 100%;
  padding: 50px;
}
.ad-log-in {
  margin-top: 100px;
}
</style>
