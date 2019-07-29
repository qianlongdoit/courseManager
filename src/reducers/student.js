import {
    NET_ERROR,
    GET_STAR_COUNT,
    GET_TASK_LIST,
    ACCEPT_TASK,
    GET_TASK_REWARD,
    EXCHANGE_REWARD,
    SELECT_REWARD,
} from '../constants/student'

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
    },
    taskList: [
        {id: 1, title: '任务标题1', describe: '描述信息', deadline: '2019-07-12 20:00:00', reward: '这里是奖励', status: 0},
        {id: 2, title: '任务标题2', describe: '描述信息2', deadline: '', reward: '', status: 1},
    ],
    selectItem: {id: 1, name: '凌美钢笔', stock: 100, cost: 30},
    rewardList: [
        {id: 1, name: '凌美钢笔', stock: 100, cost: 30},
        {id: 2, name: '派克签字笔', stock: 5, cost: 20},
    ],
    error: {
        code: '',
        msg: '',
        data: {}
    }
}

export default function student(state = INITIAL_STATE, action) {

    switch (action.type) {
        case NET_ERROR: {
            const {data} = action.payload;
            console.log('error', data);

            return {
                ...state,
                error: data
            }
        }
        case GET_STAR_COUNT: {
            const {data} = action.payload;

            return {
                ...state,
                studentStars: {
                    ...state.studentStars,
                    ...data.data
                }
            }
        }
        case GET_TASK_LIST: {
            const {data} = action.payload;

            return {
                ...state,
                taskList: data.data
            }
        }
        case ACCEPT_TASK: {
            const {data} = action.payload;
            console.log('ACCEPT_TASK: ', data);

            return {
                ...state,
            }
        }
        case GET_TASK_REWARD: {
            const {data} = action.payload;
            console.log('GET_TASK_REWARD: ', data);

            return {
                ...state,
                rewardList: data.data
            }
        }
        case EXCHANGE_REWARD: {
            const {data} = action.payload;
            console.log('EXCHANGE_REWARD: ', data);

            return {
                ...state,
            }
        }
        case SELECT_REWARD: {
            const {data} = action.payload;

            return {
                ...state,
                selectItem: data
            }
        }
        default:
            return state
    }
}
