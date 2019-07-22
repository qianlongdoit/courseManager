import {ADD, MINUS, TOGGLE_CHECKED} from '../constants/counter'

const INITIAL_STATE = {
    list: [
        {student_id: '编号', name: '姓名', star_count: '星数', checked: '选择'},
        {student_id: '1', name: '王大锤', star_count: 5, checked: true},
        {student_id: '2', name: '陆小凤', star_count: 15, checked: false},
    ],
}

export default function counter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                num: state.num + 1
            }
        case MINUS:
            return {
                ...state,
                num: state.num - 1
            }
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
