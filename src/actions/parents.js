import {
    GET_STAR_COUNT,
} from '../constants/parents'
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

export const asyncGetStarCount = (data) => {
    return dispatch => {
        wx.request({
            url: `${url}${api.GET_STAR_COUNT}`,
            data: JSON.stringify({data}),
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success (res) {
                dispatch(getStarCount(res));
            },
            fail (res) {
                dispatch(netError(res));
            }
        });
    }
}



// 异步的action
export function asyncAdd() {
    return dispatch => {
        setTimeout(() => {
            dispatch(add())
        }, 2000)
    }
}
