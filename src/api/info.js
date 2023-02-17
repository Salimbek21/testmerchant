import {httpGet, httpPost} from "./index";

export const apiInfo = (params) => {
    return httpGet({
        url: '/dealer/info',
        ...params
    })
}

export const apiUpdataParol = (data) => {
    return httpPost({
        url: '/auth/password/change',
        data
    })
}

export const apiUpdateInfo = (data) => {
    return httpPost({
        url: '/dealer/info/update',
        data
    })
}