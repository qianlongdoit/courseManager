import Taro from '@tarojs/taro'
import {
    LOGIN,
    NET_ERROR,
} from '../constants/user'
import {url} from '../utils/config'
import api from '../utils/api.js'

export const netError = res => {
    return {
        type: NET_ERROR,
        payload: {
            data: res
        }
    }
}
export const login = (res, query) => {
    return {
        type: LOGIN,
        payload: {
            data: res,
            query
        }
    }
}

export const asyncLogin = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return Taro.request({
                url: `${url}${api.LOGIN}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                }
            })
                .then(res => {
                    const {data: response = {}} = res;

                    dispatch(login(response, data));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                });
        })


    }
}
