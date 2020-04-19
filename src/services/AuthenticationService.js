import Api from "@/services/Api";

export default {
  register(credentials) {
    return Api().post("admin", credentials);
  },
  login(credentials) {
    return Api().post("admin/login", credentials);
  }
};
