import { BLOGS_QUERY_KEYS } from "../index.enum";

// const useLangParams = () => {
//   const { lang } = useParams();
//   return lang || "en";
// };

export const useBlogsQueryKeys = () => {
  // const lang = useLangParams();
  //enis cvlileba tu gvenqeba
  // return { LIST: lang + USERS_QUERY_KEYS.LIST };
  return { LIST: BLOGS_QUERY_KEYS.LIST };
};
