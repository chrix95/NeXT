import Api from "@/services/Api";

export default {
  update_profile(credentials) {
    return Api().put("admin/self", credentials);
  },
  change_password(credentials) {
    return Api().put("admin/password", credentials);
  }
};
