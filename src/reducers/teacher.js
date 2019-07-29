import * as ACTION from '../constants/teacher'

const TABLE_HEAD = {student_id: '编号', name: '姓名', star_count: '星数', checked: '选择'}
const INITIAL_STATE = {
    rules: [
        {id: '1', title: '2倍奖励', detail: '评分高于90%的学生', time: ''},
        {id: '2', title: '0.8倍奖励', detail: '评分低于90%的学生', time: ''},
    ],
    selectedRule: {},
    list: [
        {student_id: '编号', name: '姓名', star_count: '星数', checked: '选择'},
        {student_id: '1', name: '王大锤', star_count: 5, checked: true},
        {student_id: '2', name: '陆小凤', star_count: 15, checked: false},
    ],
}

export default function teacher(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ACTION.NET_ERROR: {
            const {data} = action.payload;
            console.log('error', data);

            return {
                ...state,
                error: data
            }
        }
        case ACTION.SELECT_RULE: {
            const {data} = action.payload;

            return {
                ...state,
                selectedRule: data
            }
        }
        case ACTION.TOGGLE_CHECKED: {
            const {data: index} = action.payload;
            let list = state.list.slice();
            list[index].checked = !list[index].checked;

            return {
                ...state,
                list: list
            }
        }
        case ACTION.GET_RULES: {
            const {data} = action.payload;

            return {
                ...state,
                rules: data.data
            }
        }
        case ACTION.PUBLISH_RULE: {
            const {data} = action.payload;

            return {
                ...state,
            }
        }
        case ACTION.EDIT_STAR: {
            const {data} = action.payload;

            return {
                ...state,
            }
        }
        case ACTION.GET_STUDENT_STATUS: {
            const {data} = action.payload;
            console.log([TABLE_HEAD, ...data.data]);
            return {
                ...state,
                // list: [TABLE_HEAD, ...data.data]
                list: data.data
            }
        }
        default:
            return state
    }
}
