/**
 * Created by doit on 2019/7/24.
 */

import {
    LOGIN,
    NET_ERROR
} from '../constants/user'

const INITIAL_STATE = {
    info: {
        user_id: undefined,
        token: undefined,
        user_type: undefined,
    }
}

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN: {
            const {data: {data}, query} = action.payload;
            console.log(data, query);

            return {
                ...state,
                info: {
                    token: data.token,
                    user_id: query.user_id,
                    user_type: query.user_type,
                }
            }
        }

        case NET_ERROR: {
            let {data: {data}} = action.payload;

            return {
                ...state,
            }
        }

        default:
            return state
    }
}
