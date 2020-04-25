<template>
  <div class="app-main__inner">
    <breadcrumb />
    <div class="row">
      <div class="col-lg-12">
        <div class="main-card mb-3 card">
          <div class="card-body">
            <h5 class="card-title">Admin Details</h5>
            <div class="table-responsive">
              <table class="mb-0 table table-borderless">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Type</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Date of birth</th>
                    <th>Last Logged In</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <loading />
                  </tr>
                  <tr v-else v-for="(admin, index) in admins" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
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
                    <td class="capitalize">{{ admin.gender }}</td>
                    <td>{{ admin.dob }}</td>
                    <td>{{ admin.lastLoginAt }}</td>
                    <td>
                      <button
                        class="mb-2 mr-2 border-0 btn-transition btn btn-outline-info btn-sm"
                        @click.prevent="editAdmin(admin.id)"
                      >
                        <i class="metismenu-icon pe-7s-pen"> </i>
                        Edit
                      </button>
                    </td>
                    <td v-if="admin.id !== $store.state.user.id">
                      <button
                        class="mb-2 mr-2 border-0 btn-transition btn btn-outline-danger btn-sm"
                        @click.prevent="deleteAdmin(admin.id)"
                      >
                        <i class="metismenu-icon pe-7s-delete-user"> </i>
                        Delete
                      </button>
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
      if (navigator.onLine) {
        this.loading = true;
        AdminService.get_all_admins()
          .then(result => {
            this.admins = result.data.data;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            if (err.response === undefined) {
              this.$fire("Oops! took long to get a response");
            }
            if (err.response && err.response.status === 401) {
              this.$fire("Oops! " + err.response.data.message);
              setTimeout(() => {
                this.$store.dispatch("logout");
              }, 3000);
            }
            NProgress.done();
          });
      } else {
        this.$fire({
          title: "Network Error",
          text: "Please check your internet connection and try again",
          type: "error"
        });
      }
    },
    deleteAdmin(adminId) {
      if (navigator.onLine) {
        this.$confirm("Are you sure?").then(response => {
          if (response) {
            this.loading = true;
            var data = {
              id: adminId
            };
            AdminService.delete_admin(data)
              .then(result => {
                this.admins = this.admins.filter(admin => admin.id !== adminId);
                this.loading = false;
              })
              .catch(err => {
                console.log(err.response);
                this.loading = false;
                if (err.response === undefined) {
                  this.$fire("Oops! took long to get a response");
                }
                if (err.response && err.response.status === 401) {
                  this.$fire("Oops! " + err.response.data.message);
                  setTimeout(() => {
                    this.$store.dispatch("logout");
                  }, 3000);
                }
                NProgress.done();
              });
          }
        });
      } else {
        this.$fire({
          title: "Network Error",
          text: "Please check your internet connection and try again",
          type: "error"
        });
      }
    },
    editAdmin(adminId) {
      this.$router.push({
        name: "Edit Admin Super",
        params: { id: adminId }
      });
    }
  }
};
</script>
<style scoped></style>
