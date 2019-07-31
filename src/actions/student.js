import Taro from '@tarojs/taro'
import {
    NET_ERROR,
    GET_STAR_COUNT,
    GET_TASK_LIST,
    ACCEPT_TASK,
    GET_TASK_REWARD,
    EXCHANGE_REWARD,
    SELECT_REWARD,
} from '../constants/student'
import {url} from '../utils/config'
import api from '../utils/api.js'

export const netError = res =>{
    return {
        type: NET_ERROR,
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
export const getTaskList = (res) => {
    return {
        type: GET_TASK_LIST,
        payload: {
            data: res
        }
    }
}
export const acceptTask = (res) => {
    return {
        type: ACCEPT_TASK,
        payload: {
            data: res
        }
    }
}
export const getRewardList = (res) => {
    return {
        type: GET_TASK_REWARD,
        payload: {
            data: res
        }
    }
}
export const exchangeReward = (res) => {
    return {
        type: EXCHANGE_REWARD,
        payload: {
            data: res
        }
    }
}

export const selectReward = (res) => {
    return {
        type: SELECT_REWARD,
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
                    dispatch(getStarCount(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}
export const asyncGetTaskList = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return Taro.request({
                url: `${url}${api.GET_TASK}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res =>{
                    const {data: response = {}} = res;
                    dispatch(getTaskList(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}
export const asyncAcceptTask = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return Taro.request({
                url: `${url}${api.ACCEPT_TASK}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(acceptTask(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}
export const asyncGetRewardList = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.GET_TASK_REWARD}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;

                    dispatch(getRewardList(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e));
                    reject(e)
                })
        })
    }
}
export const asyncExchangeReward = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${url}${api.EXCHANGE_REWARD}`,
                data: JSON.stringify({data}),
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            })
                .then(res => {
                    const {data: response = {}} = res;
                    dispatch(exchangeReward(response));
                    resolve(response)
                })
                .catch(e => {
                    dispatch(netError(e))
                    reject(e)
                })
        })
    }
}
