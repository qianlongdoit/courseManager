import Taro from '@tarojs/taro'
import  * as action from '../constants/teacher'
import {url} from '../uitls/config'
import api from '../uitls/api.js'

export const netError = res =>{
    return {
        type: action.NET_ERROR,
        payload: {
            data: res
        }
    }
}
export const selectRule = res =>{
    return {
        type: action.SELECT_RULE,
        payload: {
            data: res
        }
    }
}

export const toggleChecked = (res) => {
    return {
        type: action.TOGGLE_CHECKED,
        payload: {
            data: res
        }
    }
}

export const getRules = (res) => {
    return {
        type: action.GET_RULES,
        payload: {
            data: res
        }
    }
}
export const publishRule = (res) => {
    return {
        type: action.PUBLISH_RULE,
        payload: {
            data: res
        }
    }
}
export const editCount = (res) => {
    return {
        type: action.EDIT_COUNT,
        payload: {
            data: res
        }
    }
}
export const getStudentStatus = (res) => {
    return {
        type: action.GET_STUDENT_STATUS,
        payload: {
            data: res
        }
    }
}



export const asyncGetRules = (data) => {
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
                    dispatch(getRules(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}
export const asyncPublishRule = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.PUBLISH_RULE}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(publishRule(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}
export const asyncEditStar = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.EDIT_STAR}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(editCount(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}
export const asyncGetStudentStatus = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.STUDENT_STATUS}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(getStudentStatus(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}