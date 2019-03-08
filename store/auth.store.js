import { types } from "mobx-state-tree";

export const AuthStore = types
  .model("AuthStore", {
    auth: types.optional(types.string, "")
  })
  .views(self => ({
    get getAuth() {
      return self.auth;
    }
  }))
  .actions(self => ({
    setAuth(string) {
      localStorage.setItem("token", string);
      self.auth = localStorage.getItem("token");
    },
    clearAuth() {
      localStorage.setItem("token", "");
      self.auth = "";
    }
  }));
