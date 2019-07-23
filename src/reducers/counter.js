import {
    LOGIN,
    NET_ERROR,
    GET_STAR_COUNT,
    TOGGLE_CHECKED,
} from '../constants/counter'

const INITIAL_STATE = {
    list: [
        {student_id: '编号', name: '姓名', star_count: '星数', checked: '选择'},
        {student_id: '1', name: '王大锤', star_count: 5, checked: true},
        {student_id: '2', name: '陆小凤', star_count: 15, checked: false},
    ],
    studentStars: {
        total_count: 0,
        exchange_count: 0,
        reduce_count: 0,
    }
}

export default function counter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN:
            const {data: {data}} = action.payload;
            console.log('----', data);

            return {
                ...state,
            }
        case NET_ERROR:
            console.log('error', action.payload);

            return {
                ...state,
            }

        //  学生部分
        case GET_STAR_COUNT:
            console.log('GET_STAR_COUNT: ', action.payload);

            return {
                ...state,
            }

        //  老师部分
        case TOGGLE_CHECKED:
            const {index} = action.payload;
            let list = state.list.slice();
            list[index].checked = !list[index].checked;

            return {
                ...state,
                list: list
            }
        default:
            return state
    }
}
