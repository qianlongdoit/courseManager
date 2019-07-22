import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtIcon,
} from 'taro-ui'

import './index.less'
import Stars from '../../components/common-star'

class UserInfo extends Component {

    config = {
        navigationBarTitleText: '学生'
    }

    state = {
        current: 0,
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props, nextProps)
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    render() {
        const {current} = this.state;

        return (
            <View className='student-info'>
                <View className='h3'>
                    <Text>个人信息：</Text>
                </View>

                <View className='list'>
                    累计星数量：
                    <Stars count={4}/>
                </View>
                <View className='list'>
                    可用于兑换：
                    <Stars count={4}/>
                </View>
                <View className='list'>
                    即将减少的：
                    <Stars count={4}/>
                </View>
            </View>
        )
    }
}

export default UserInfo
