import { httpGet } from "./index";

export const apiHome = (params) => {
  return httpGet({
    url: "/dealer/home",
    params: {
      ...params,
    },
  });
};


export const apiHomeOrder = (params) => {
    return httpGet({
      url: "/dealer/order",
      params: {
        ...params,
      },
    });
  };
  