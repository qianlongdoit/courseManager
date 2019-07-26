import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './index.less'

class Title extends Component {
    render() {
        return (
            <View className='h3'>
                <View className='title'>{this.props.title}</View>
            </View>
        )
    }
}

export default Title
