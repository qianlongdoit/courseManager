import Taro from '@tarojs/taro'
import  * as ACTION from '../constants/teacher'
import {url} from '../uitls/config'
import api from '../uitls/api.js'

export const netError = res =>{
    return {
        type: ACTION.NET_ERROR,
        payload: {
            data: res
        }
    }
}


export const asyncGetStarCount = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.GET_STAR_COUNT}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(selectReward(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}