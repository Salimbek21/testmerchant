import {httpGet} from "./index";

export const apiInfoHome = (params) => {
    return httpGet({
        url: '/auth/dealer/home',
        ...params
    })
}