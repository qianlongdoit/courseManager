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

    render() {
        const {studentStars = {}, title} = this.props;

        return (
            <View className='student-info'>
                <View className='h3'>
                    <Text>{title}</Text>
                </View>

                <View className='list'>
                    累计星数量：
                    <Stars count={studentStars.total_count}/>
                </View>
                <View className='list'>
                    可用于兑换：
                    <Stars count={studentStars.exchange_count}/>
                </View>
                <View className='list'>
                    即将减少的：
                    <Stars count={studentStars.reduce_count}/>
                </View>
            </View>
        )
    }
}

export default UserInfo
