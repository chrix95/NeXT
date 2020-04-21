<template>
  <section>
    <div class="ad-log-main">
      <div class="ad-log-in">
        <div class="ad-log-in-logo">
          <router-link to="/">
            <img src="images/logo.png" alt="" />
          </router-link>
        </div>
        <div class="ad-log-in-con">
          <div class="log-in-pop-right">
            <h4>Login</h4>
            <div
              class="alert"
              v-show="error !== null || success !== null"
              :class="error !== null ? 'alert-warning' : 'alert-success'"
            >
              {{ error !== null ? error : success }}
            </div>
            <form class="s12">
              <div>
                <div class="input-field s12">
                  <input type="text" v-model="user.username" class="validate" />
                  <label class="">User name</label>
                </div>
              </div>
              <div>
                <div class="input-field s12">
                  <input
                    type="password"
                    v-model="user.password"
                    class="validate"
                  />
                  <label>Password</label>
                </div>
              </div>
              <div>
                <div class="input-field s4">
                  <i
                    class="waves-effect waves-light log-in-btn waves-input-wrapper"
                    style=""
                    ><input
                      type="submit"
                      @click.prevent="loginUser()"
                      value="Login"
                      class="waves-button-input"
                  /></i>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
/* eslint-disable no-undef */
import AuthenticationService from "@/services/AuthenticationService";
// import { mapState } from "vuex";
export default {
  // computed: mapState(["token"]),
  name: "Login",
  metaInfo: {
    // all titles will be injected into this template
    titleTemplate: "%s | Login",
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
  beforeMount() {
    if (this.$store.state.isUserLoggedIn) {
      this.$router.push({
        name: "dashboard"
      });
    }
  },
  data() {
    return {
      user: {
        username: "super",
        password: "123456"
      },
      error: null,
      success: null
    };
  },
  methods: {
    loginUser() {
      if (this.validateLogin()) {
        AuthenticationService.login(this.user)
          .then(result => {
            this.$store.dispatch("login", result.data);
            this.$router.push({
              name: "dashboard"
            });
            location.reload();
          })
          .catch(() => {
            this.error = "Invalid credentials";
            NProgress.done();
            setTimeout(() => {
              this.error = null;
            }, 2000);
          });
      }
    },
    validateLogin() {
      if (this.user.username) {
        if (this.user.password) {
          return true;
        } else {
          this.error = "Password is required";
        }
      } else {
        this.error = "Username is required";
      }
    }
  }
};
</script>
<style scoped>
.log-in-pop-right {
  float: left;
  width: 100%;
  padding: 50px;
}
.ad-log-in {
  margin-top: 100px;
}
</style>
