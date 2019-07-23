import {
    ADD,
    MINUS,
    NET_ERROR,
    LOGIN,
    GET_STAR_COUNT,
    TOGGLE_CHECKED
} from '../constants/counter'
import {url} from '../uitls/config'
import api from '../uitls/api.js'

export const add = () => {
    return {
        type: ADD
    }
}
export const minus = () => {
    return {
        type: MINUS
    }
}
export const toggleChecked = (index) => {
    return {
        type: TOGGLE_CHECKED,
        payload: {
            index,
        }
    }
}

export const login = (res) => {
    return {
        type: LOGIN,
        payload: {
            data: res
        }
    }
}

export const getStarCount = (res) => {
    return {
        type: GET_STAR_COUNT,
        payload: {
            data: res
        }
    }
}

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

export const asyncLogin = (data) => {
    return dispatch => {
        wx.request({
            url: `${url}${api.LOGIN}`,
            data: JSON.stringify({data}),
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success (res) {
                dispatch(login(res));
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
