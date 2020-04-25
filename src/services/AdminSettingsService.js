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
    console.log("We are here credentials");
    console.log(credentials);
    return Api().put("admin/self", credentials);
  }
};
