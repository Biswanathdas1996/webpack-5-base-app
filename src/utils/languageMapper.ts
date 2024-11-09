import { CURRENT_LANGUAGE } from "../config";
import _ from "lodash";
import English from "../lang/english.json";
import Bengali from "../lang/bengali.json";
import Hindi from "../lang/hindi.json";

type LanguageData = typeof English;

export const add_lang = (LANGUAGE: string): LanguageData => {
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

export const site_text = (path: string): string | undefined => {
  const data = add_lang(CURRENT_LANGUAGE);
  return _.get(data, path);
};
