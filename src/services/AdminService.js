import Api from "@/services/Api";

const userString = JSON.parse(localStorage.getItem("login"));
let config = {};
if (userString) {
  config = {
    headers: {
      Authorization: `${userString.token}`
    }
  };
}
export default {
  get_all_admins() {
    return Api().get("admin/all", config);
  },
  login(credentials) {
    return Api().post("admin/login", credentials);
  }
};
