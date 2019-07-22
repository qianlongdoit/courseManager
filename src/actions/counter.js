import {
    ADD,
    MINUS,
    TOGGLE_CHECKED
} from '../constants/counter'

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

// 异步的action
export function asyncAdd() {
    return dispatch => {
        setTimeout(() => {
            dispatch(add())
        }, 2000)
    }
}
