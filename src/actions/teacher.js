import Taro from '@tarojs/taro'
import {
    NET_ERROR,
    GET_RULES,
    PUBLISH_RULE,
    EDIT_COUNT,
} from '../constants/teacher'
import {url} from '../uitls/config'
import api from '../uitls/api.js'

export const netError = res =>{
    return {
        type: NET_ERROR,
        payload: {
            data: res
        }
    }
}

export const selectReward = (res) => {
    return {
        type: GET_RULES,
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