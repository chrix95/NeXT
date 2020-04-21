<template>
  <div class="sb2-2">
    <!--== breadcrumbs ==-->
    <breadcrumb />
    <!--== User Details ==-->
    <div class="sb2-2-3">
      <div class="row">
        <div class="col-md-12">
          <div class="box-inn-sp">
            <div class="inn-title">
              <h4>Admins Details</h4>
              <p>
                All about students like name, student id, phone, email, country,
                city and more
              </p>
            </div>
            <div class="tab-inn">
              <div class="table-responsive table-desi">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Type</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Date of birth</th>
                      <th>Last Logged In</th>
                      <th>Status</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="loading">
                      <loading />
                    </tr>
                    <tr v-else v-for="(admin, index) in admins" :key="index">
                      <td>
                        <span class="list-img">{{ admin.username }}</span>
                      </td>
                      <td>
                        <span class="list-enq-name capitalize">{{
                          admin.type
                        }}</span>
                      </td>
                      <td>{{ admin.phone }}</td>
                      <td>{{ admin.email }}</td>
                      <td>{{ admin.gender }}</td>
                      <td>{{ admin.dob }}</td>
                      <td>{{ admin.lastLoginAt }}</td>
                      <td>
                        <span class="label label-success">Active</span>
                      </td>
                      <td>
                        <a href="admin-student-details.html" class="ad-st-view"
                          >View</a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
  name: "AllAdmin",
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
  mounted() {
    this.getAdmins();
  },
  data() {
    return {
      loading: false,
      admins: null
    };
  },
  methods: {
    getAdmins() {
      this.loading = true;
      AdminService.get_all_admins()
        .then(result => {
          this.admins = result.data.data;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response);
          if (err.response.status === 401) {
            this.$store.dispatch("logout");
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
