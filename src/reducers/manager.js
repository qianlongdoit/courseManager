import * as ACTION from '../constants/manager'

const INITIAL_STATE = {
    list: [

    ],
}

export default function manager(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ACTION.NET_ERROR: {
            const {data} = action.payload;
            console.log('error', data);

            return {
                ...state,
                error: data
            }
        }
        case ACTION.ADD_RULE: {
            const {data} = action.payload;
            console.log('ADD_RULE: ', data);

            return {
                ...state,
            }
        }
        case ACTION.ADD_CLASS: {
            const {data} = action.payload;
            console.log('ADD_CLASS: ', data);

            return {
                ...state,
            }
        }
        case ACTION.ADD_PRIZE: {
            const {data} = action.payload;
            console.log('ADD_PRIZE: ', data);

            return {
                ...state,
            }
        }
        case ACTION.ADD_SERVICE: {
            const {data} = action.payload;
            console.log('ADD_SERVICE: ', data);

            return {
                ...state,
            }
        }
        default:
            return state
    }
}
