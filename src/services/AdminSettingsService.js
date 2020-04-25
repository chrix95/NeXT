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
  update_profile(credentials) {
    return Api().put("admin/self", credentials);
  },
  change_password(credentials) {
    return Api().put("admin/password", credentials);
  }
};
