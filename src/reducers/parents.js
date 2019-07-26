import * as ACTION from '../constants/parents'

const INITIAL_STATE = {
    starCount: 0
}

export default function parents (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ACTION.NET_ERROR:{
            const {data} = action.payload;
            console.log('error', data);

            return {
                ...state,
            }
        }
        case ACTION.GET_STAR_COUNT:{
            const {data} = action.payload;
            console.log('GET_STAR_COUNT: ', data);

            return {
                ...state,
                starCount: data.star_count
            }
        }
        default:
            return state
    }
}
