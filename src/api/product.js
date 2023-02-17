import { httpGet } from "./index";

export const apiProduct = (params) => {
  return httpGet({
    url: "/dealer/items",
    params: {
      ...params,
      per_page: 12,
      asc: 0
    },
  });
};
