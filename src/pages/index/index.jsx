import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import {connect} from '@tarojs/redux'

import {add, minus, asyncAdd} from '../../actions/counter'

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
class Index extends Component {

    config = {
        navigationBarTitleText: '首页'
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
        return (
            <View className='index'>
                <navigator url="/pages/student/index">学生</navigator>
                <navigator url="/pages/teacher/index">老师</navigator>
                <navigator url="/pages/manager/index">机构人员</navigator>
                <navigator url="/pages/parents/index">家长</navigator>

                <Button className='add_btn' onClick={this.props.add}>+</Button>
                <Button className='dec_btn' onClick={this.props.dec}>-</Button>
                <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
                <View><Text>{this.props.counter.num}</Text></View>
                <View><Text>Hello, World</Text></View>
            </View>
        )
    }
}

export default Index
