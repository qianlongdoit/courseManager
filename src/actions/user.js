import Taro from '@tarojs/taro'
import {
    LOGIN,
    NET_ERROR,
} from '../constants/user'
import {url} from '../uitls/config'
import api from '../uitls/api.js'

export const netError = res => {
    return {
        type: NET_ERROR,
        payload: {
            data: res
        }
    }
}
export const login = res => {
    return {
        type: LOGIN,
        payload: {
            data: res
        }
    }
}

export const asyncLogin = (data) => {
    return dispatch => {
        Taro.request({
            url: `${url}${api.LOGIN}`,
            data: JSON.stringify({data}),
            method: 'POST',
            header: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                const {data: response = {}} = res;
                const {code, data, msg} = response;

                if (code !== 0) {
                    dispatch(netError(response));
                } else {
                    dispatch(login(response));
                }
            })
            .catch(e => {
                dispatch(netError(e))
            });


    }
}
