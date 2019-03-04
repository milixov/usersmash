import { types, applySnapshot } from "mobx-state-tree";
import { LocaleStore } from "./locale.store";

let store = null;
export const Store = types
  .model("Store", {
    name: "App",
    localeStore: types.optional(LocaleStore, {})
  })
  .views(self => ({
    // get isLoading() {
    //   return self.bookStore.isLoading
    // },
    // get posts() {
    //   return self.postStore.posts
    // }
  }))
  .actions(self => ({
    afterCreate() {
      // self.postStore.loadPosts()
    }
  }));

export function initializeStore(isServer, snapshot = null) {
  if (isServer) {
    store = Store.create(
      {},
      {
        alert: m => console.log(m)
      }
    );
  }
  if (store === null) {
    store = Store.create(
      {},
      {
        alert: m => console.log(m)
      }
    );
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  return store;
}
