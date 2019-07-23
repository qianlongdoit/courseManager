import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker } from '@tarojs/components'
import { AtForm } from 'taro-ui'
import {connect} from '@tarojs/redux'

// import {add, minus, asyncAdd} from '../../actions/counter'
import StudentStatus from '../../components/student-stars'

import './index.less'
import UserInfo from "../student";


@connect(({counter}) => ({
    counter
}), (dispatch) => ({
    // add() {
    //     dispatch(add())
    // },
    // dec() {
    //     dispatch(minus())
    // },
    // asyncAdd() {
    //     dispatch(asyncAdd())
    // }
}))
class Student extends Component {

    config = {
        navigationBarTitleText: '家长'
    }

    state = {
    }

    componentDidShow() {
        const {getStarCount} = this.props;
        getStarCount({});
    }

    render() {
        const {counter} = this.props;
        const {studentStars} = counter;

        return (
            <View className='index'>
                <View className='page-section'>
                    <StudentStatus
                        title={'学生信息：'}
                        studentStars={studentStars}
                    />
                </View>
            </View>
        )
    }

    onChange = e => {
        this.setState({
            selectorChecked: this.state.selector[e.detail.value]
        })
    }
}

export default Student
