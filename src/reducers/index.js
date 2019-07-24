import {combineReducers} from 'redux'
import user from './user'
import student from './student'
import parents from './parents'

export default combineReducers({
    user,
    student,
    parents,
})
