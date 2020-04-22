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
  create_admin(credentials) {
    return Api().post("admin", credentials);
  }
};
