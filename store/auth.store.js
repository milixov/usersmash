import { types } from "mobx-state-tree";
import Cookie from "mobx-cookie";

const cookie = new Cookie("session");

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
      cookie.set(string, { expires: 1 });
      self.auth = string;
    },
    logout() {
      cookie.remove();
      self.auth = "";
    }
  }));
