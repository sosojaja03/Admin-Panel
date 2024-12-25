import { USERS_QUERY_KEYS } from "../indexenum";

// const useLangParams = () => {
//   const { lang } = useParams();
//   return lang || "en";
// };

export const useUserQueryKeys = () => {
  // const lang = useLangParams();
  //enis cvlileba tu gvenqeba
  // return { LIST: lang + USERS_QUERY_KEYS.LIST };
  return { LIST: USERS_QUERY_KEYS.LIST };
};
