import {httpPost} from "./index";

export const apiAuth = (params) => {
    return httpPost({
        url: '/auth/dealer/login',
        data: {
            ...params
        }
    })
}