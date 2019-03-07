import { types } from "mobx-state-tree";
import Cookie from "mobx-cookie";
import axios from "axios";

const cookie = new Cookie("session");

export const AuthStore = types
  .model("AuthStore", {
    auth: types.optional(types.string, ""),
    loading: types.optional(types.boolean, false),
    failed: types.optional(types.boolean, false),
    message: types.optional(types.string, "")
  })
  .views(self => ({
    get getAuth() {
      return self.auth;
    },
    get getLoading() {
      return self.loading;
    },
    get getFailed() {
      return self.failed;
    },
    get getMessage() {
      return self.message;
    }
  }))
  .actions(self => ({
    reset() {
      self.failed = false;
      self.message = "";
      self.loading = false;
    },
    setAuth(string) {
      cookie.set(string, { expires: 1 });
      self.auth = string;
    },
    setFailed(boolean) {
      self.failed = boolean;
    },
    setMessage(string) {
      self.message = string;
    },
    setLoading(boolean) {
      self.loading = boolean;
    },
    login(email, password) {
      this.setLoading(true);

      axios
        .post("https://reqres.in/api/login", { email, password })
        .then(resp => {
          this.setFailed(false);
          this.setAuth(resp.data.token);
          this.setLoading(false);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
            this.setFailed(true);
            this.setMessage(error.response.data.error);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error);
          }
          this.setLoading(false);
        });
    },
    logout() {
      cookie.remove();
      self.auth = "";
    }
  }));
