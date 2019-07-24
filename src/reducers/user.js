/**
 * Created by doit on 2019/7/24.
 */

import {
    LOGIN,
    NET_ERROR
} from '../constants/user'

const INITIAL_STATE = {
    info: {
        user_id: '001000100001',
        token: 'iBulnqIMsHhfaVDzHVvIzMGDdCokQHwC'
        // token: 'YikbbCbgQycJDbUbBVIssUlSMbREamqK'
        // token: 'GdcLIQWjelTwEJCNWbWlkIkYsBZyBXXA'
    }
}

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN:
            // const {data: {data}} = action.payload;
            console.log(action.payload);

            return {
                ...state,
            }
        case NET_ERROR:
            let {data: {data}} = action.payload;

            return {
                ...state,
            }
        default:
            return state
    }
}
