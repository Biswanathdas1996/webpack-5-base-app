import { CURRENT_LANGUAGE } from "../config";
import _ from "lodash";
import English from "../lang/english.json";
import Bengali from "../lang/bengali.json";
import Hindi from "../lang/hindi.json";

export const add_lang = (LANGUAGE) => {
  switch (LANGUAGE) {
    case "English":
      return English;
    case "Bengali":
      return Bengali;
    case "Hindi":
      return Hindi;
    default:
      return English;
  }
};

export const site_text = (path) => {
  const data = add_lang(CURRENT_LANGUAGE);
  return _.get(data, path);
};
