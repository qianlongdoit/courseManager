import {combineReducers} from 'redux'
import user from './user'
import student from './student'
import teacher from './teacher'
import parents from './parents'
import manager from './manager'

export default combineReducers({
    user,
    student,
    teacher,
    manager,
    parents,
})
