import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker } from '@tarojs/components'
import { AtForm } from 'taro-ui'
import {connect} from '@tarojs/redux'

import {add, minus, asyncAdd} from '../../actions/student'

import './index.less'


@connect(({counter}) => ({
    counter
}), (dispatch) => ({
    add() {
        dispatch(add())
    },
    dec() {
        dispatch(minus())
    },
    asyncAdd() {
        dispatch(asyncAdd())
    }
}))
class Student extends Component {

    config = {
        navigationBarTitleText: '家长'
    }

    state = {
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    render() {
        const {selector} = this.state;

        return (
            <View className='index'>
                <View className='page-section'>
                    <Text>管理人员</Text>

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
