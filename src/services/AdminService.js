import Api from "@/services/Api";

// const userString = JSON.parse(localStorage.getItem("login"));
// let config = {};
// if (userString) {
//   config = {
//     headers: {
//       Authorization: `${userString.token}`
//     }
//   };
// }
export default {
  get_all_admins() {
    return Api().get("admin/all");
  },
  get_one_admin(adminId) {
    return Api().get("admin/one/" + adminId);
  },
  create_admin(credentials) {
    return Api().post("admin", credentials);
  },
  update_admin_by_superadmin(credentials) {
    return Api().put("admin/super", credentials);
  },
  delete_admin(credentials) {
    return Api().delete("admin", { data: credentials });
  }
};
