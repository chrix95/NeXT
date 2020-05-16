<template>
  <div class="app-main__inner">
    <breadcrumb />
    <div class="row">
      <div class="col-lg-12">
        <div class="main-card mb-3 card">
          <div class="card-body">
            <h5 class="card-title">
              Agents
              <span class="pull-right">Page: {{ page }}  |  Total agent(s): {{ total }}</span>
            </h5>
            <div class="table-responsive">
              <table class="mb-0 table table-borderless text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Type</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Active</th>
                    <th>Last Logged In</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <loading />
                  </tr>
                  <tr v-else v-for="(agent, index) in agents" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                      <span class="list-img">{{ agent.username }}</span>
                    </td>
                    <td>
                      <span class="list-enq-name capitalize">{{
                        agent.type
                      }}</span>
                    </td>
                    <td>{{ agent.phone }}</td>
                    <td>{{ agent.email }}</td>
                    <td class="capitalize">{{ agent.gender }}</td>
                    <td>{{ agent.active ? 'Active' : 'Inactive' }}</td>
                    <td>{{ agent.lastLoginAt }}</td>
                    <td>
                      <button
                        class="mb-2 mr-2 border-0 btn-transition btn btn-outline-info btn-sm"
                        @click.prevent="viewAgent(agent.id)"
                      >
                        <i class="metismenu-icon pe-7s-pen"> </i>
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        class="mb-2 mr-2 border-0 btn-transition btn btn-outline-danger btn-sm"
                        @click.prevent="deleteAgent(agent.id)"
                      >
                        <i class="metismenu-icon pe-7s-delete-user"> </i>
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-center" v-if="!loading && moreBtn">
                <button type="submit" class="mt-2 btn btn-primary" @click="loadMoreAgents()" v-if="!loadmore">
                  Load more
                </button>
                <button type="submit" class="mt-2 btn btn-primary" v-else>
                  <i class="pe-7s-refresh pe-spin"></i> Loading...
                </button>
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
import AgentService from "@/services/AgentService";
import Breadcrumb from "@/components/_partials/Breadcrumb";
import Loading from "@/components/_partials/Loading";
export default {
  name: "AllAgents",
  metaInfo: {
    // all titles will be injected into this template
    titleTemplate: "%s | Agents",
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
    this.getAgents();
  },
  data() {
    return {
      loading: false,
      agents: null,
      moreBtn: false,
      page: 0,
      total: null,
      loadmore: false
    };
  },
  methods: {
    getAgents() {
      if (navigator.onLine) {
        this.loading = true;
        AgentService.get_all_agents()
          .then(result => {
            this.agents = result.data.data;
            // this.moreBtn = result.data.more;
            this.moreBtn = true;
            this.total = result.data.total;
            this.page += 1;
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
    loadMoreAgents() {
      if (navigator.onLine) {
        this.loadmore = true;
        const data = {
          page: this.page + 1,
          sort: "asc"
        }
        AgentService.load_more_agent(data)
          .then(result => {
            let moreAgent = result.data.data;
            moreAgent.forEach(element => {
              this.agents.push(element);
            });
            this.moreBtn = result.data.more;
            this.page++;
            this.loadmore = false;
          })
          .catch(err => {
            this.loadmore = false;
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
    deleteAgent(adminId) {
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
    viewAgent(adminId) {
      this.$router.push({
        name: "View Agent",
        params: { id: adminId }
      });
    }
  }
};
</script>
<style scoped></style>
