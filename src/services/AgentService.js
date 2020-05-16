import Api from "@/services/Api";

export default {
  get_all_agents() {
    return Api().get("admin/agents");
  },
  load_more_agent(credentials) {
    return Api().post("admin/agents-more", credentials);
  },
  // get_one_admin(adminId) {
  //   return Api().get("admin/one/" + adminId);
  // },
  // create_admin(credentials) {
  //   return Api().post("admin", credentials);
  // },
  // update_admin_by_superadmin(credentials) {
  //   return Api().put("admin/super", credentials);
  // },
  // delete_admin(credentials) {
  //   return Api().delete("admin", { data: credentials });
  // }
};
