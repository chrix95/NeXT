<template>
  <div class="sb2-2">
    <!--== breadcrumbs ==-->
    <breadcrumb />
    <!--== User Details ==-->
    <div class="sb2-2-3">
      <div class="row">
        <div class="col-md-12">
          <div class="box-inn-sp admin-form">
            <div class="inn-title">
              <h4>Create Admin</h4>
            </div>
            <div class="tab-inn">
              <form>
                <div class="row">
                  <div class="input-field col s6">
                    <input
                      type="text"
                      v-model="user.username"
                      value=""
                      class="validate"
                      required
                    />
                    <label class="">Username</label>
                  </div>
                  <div class="input-field col s6">
                    <input
                      type="email"
                      v-model="user.email"
                      value=""
                      class="validate"
                      required
                    />
                    <label class="">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <input
                      type="number"
                      v-model="user.phone"
                      value=""
                      class="validate"
                      required
                    />
                    <label class="">Phone number</label>
                  </div>
                  <div class="input-field col s6">
                    <!-- <label class="">Date of Birth</label> -->
                    <input
                      type="date"
                      v-model="user.dob"
                      class="validate"
                      value=""
                      required
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <label class="">Admin Gender</label>
                    <select
                      name="gender"
                      v-model="user.gender"
                      class="validate"
                    >
                      <option selected disabled>Select an option</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div class="input-field col s6">
                    <label class="">Admin Type</label>
                    <select name="type" v-model="user.type" class="validate">
                      <option selected disabled>Select an option</option>
                      <option value="super">Super admin</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <input type="password" value="" class="validate" />
                    <label class="">Password</label>
                  </div>
                  <div class="input-field col s6">
                    <input type="password" value="" class="validate" />
                    <label class="">Confirm Password</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input type="text" value="" class="validate" />
                    <label>Student id</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12" v-if="!loading">
                    <i
                      class="waves-effect waves-light btn-large waves-input-wrapper"
                      style=""
                      ><input type="submit" class="waves-button-input"
                    /></i>
                  </div>
                  <div class="input-field col s12" v-else>
                    <loading />
                  </div>
                </div>
              </form>
            </div>
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
        content: "We are coming soon"
      },
      {
        name: "keywords",
        content: "We will fix this soon"
      }
    ]
  },
  components: {
    Breadcrumb,
    Loading
  },
  mounted() {},
  data() {
    return {
      loading: false,
      user: {
        username: "",
        password: "",
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
      this.loading = true;
      AdminService.create_admin()
        .then(result => {
          this.admins = result.data.data;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response);
          if (err.response && err.response.status === 401) {
            this.$fire("Oops! " + err.response.data.message);
          }
          if (err.response === undefined) {
            this.$fire("Oops! took long to get a response");
          }
        });
    },
    deleteAdmin(id) {
      this.$confirm("Are you sure?").then(response => {
        //do something...
        if (response) {
          console.log(response);
          console.log(id);
        } else {
          console.log("Not ready");
        }
      });
    }
  }
};
</script>
<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
