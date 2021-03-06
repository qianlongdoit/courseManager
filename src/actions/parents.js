import Taro from '@tarojs/taro'
import * as ACTION from '../constants/parents'
import {url} from '../utils/config'
import api from '../utils/api.js'

export const netError = res => {
    return {
        type: ACTION.NET_ERROR,
        payload: {
            data: res
        }
    }
}
export const getStars = res => {
    return {
        type: ACTION.GET_STAR_COUNT,
        payload: {
            data: res
        }
    }
}

export const asyncGetStarCount = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.PARENT_GET_STUDENT_STATUS}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                }
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(getStars(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}