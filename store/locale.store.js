import { types } from "mobx-state-tree";

export const LocaleStore = types
  .model("LocaleStore", {
    locale: types.optional(types.string, "en")
  })
  .views(self => ({
    get getLocale() {
      return self.locale;
    }
  }))
  .actions(self => {
    return {
      setLocale(localeString) {
        self.locale = localeString;
      }
    };
  });
