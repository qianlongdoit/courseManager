import {
    GET_STAR_COUNT,
} from '../constants/parents'

const INITIAL_STATE = {
    starCount: 0
}

export default function parents (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_STAR_COUNT:
            const {data: {data}} = action.payload;

            return {
                ...state,
            }
        default:
            return state
    }
}
