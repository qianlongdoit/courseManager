import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtIcon,
} from 'taro-ui'

import './index.less'

class Star extends Component {
    componentDidShow() {
    }

    render() {
        const {count, size = 18, color = '#50a14f'} = this.props;

        return (
            <View className='star'>
                <Text>{count}</Text>
                <AtIcon value='star-2' size={size} color={color} />
            </View>
        )
    }
}

export default Star
