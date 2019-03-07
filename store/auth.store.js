import { types } from "mobx-state-tree";
import Cookie from "mobx-cookie";

export const AuthStore = types
  .model("AuthStore", {
    auth: new Cookie("session")
  })
  .views(self => ({
    get getAuth() {
      return self.auth;
    }
  }))
  .actions(self => {
    return {
      setAuth(authString) {
        self.auth.set(authString, { expires: 1 });
      },
      clearAuth() {
        self.auth.remove();
      }
    };
  });
