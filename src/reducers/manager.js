import * as ACTION from '../constants/teacher'

const INITIAL_STATE = {
    list: [
        {student_id: '编号', name: '姓名', star_count: '星数', checked: '选择'},
        {student_id: '1', name: '王大锤', star_count: 5, checked: true},
        {student_id: '2', name: '陆小凤', star_count: 15, checked: false},
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
        default:
            return state
    }
}
