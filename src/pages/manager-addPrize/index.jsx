import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import {
    AtList,
    AtListItem,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {asyncGetStarCount} from '../../actions/manager'

import './index.less'



@connect(({user, manager}) => ({
    user,
    manager,
}), (dispatch) => ({
    asyncGetStarCount() {
        return dispatch(asyncGetStarCount())
    },
}))
class Student extends Component {

    config = {
        navigationBarTitleText: '添加服务'
    }

    state = {
    }

    componentDidShow() {
    }

    render() {

        return (
            <View className='index'>
                <View className='page-section'>
                    <Text>添加服务</Text>
                </View>

            </View>
        )
    }
}

export default Student
