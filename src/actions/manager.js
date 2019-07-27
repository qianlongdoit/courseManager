import Taro from '@tarojs/taro'
import  * as ACTION from '../constants/manager'
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
export const getTeacherInfo = res =>{
    return {
        type: ACTION.GET_TEACHER_INFO,
        payload: {
            data: res
        }
    }
}
export const addRule = res =>{
    return {
        type: ACTION.ADD_RULE,
        payload: {
            data: res
        }
    }
}
export const addClass = res =>{
    return {
        type: ACTION.ADD_CLASS,
        payload: {
            data: res
        }
    }
}
export const addPrize = res =>{
    return {
        type: ACTION.ADD_PRIZE,
        payload: {
            data: res
        }
    }
}
export const addService = res =>{
    return {
        type: ACTION.ADD_SERVICE,
        payload: {
            data: res
        }
    }
}


export const asyncGetTeacherInfo = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.GET_TEACHER_INFO}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(getTeacherInfo(response));
                    resolve(response)
                })
                .catch(e => {
                    debugger
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}
export const asyncAddRule = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.ADD_RULE}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(addRule(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}
export const asyncAddClass = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.ADD_CLASS}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(addClass(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}
export const asyncAddPrize = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.ADD_PRIZE}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(addPrize(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}
export const asyncAddService = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.ADD_SERVICE}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(addService(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}