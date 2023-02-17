import { httpGet } from "./index";

export const apiOrder = (params) => {
  return httpGet({
    url: "/dealer/order",
    params: {
      ...params,
    },
  });
};
