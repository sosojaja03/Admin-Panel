import { USER_ROUTES } from "./Users";
import { BLOGS_ROUTES } from "./Blogs/indext";

export const ADMIN_ROUTES = [...USER_ROUTES, ...BLOGS_ROUTES];
