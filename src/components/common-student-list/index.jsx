import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtIcon,
} from 'taro-ui'

import Stars from '../../components/common-star'
import './index.less'

const COLOR = ['#10a123', '#222'];

class Star extends Component {
    componentDidShow() {
    }

    render() {
        const {
            type,
            item = {},
            // toggleChecked
        } = this.props;
        const {student_id, name, star_count, checked} = item;
        const isHead = type === 'thead';

        return (
            <View className='student-list'>
                <View className={isHead ? 'head' : 'id'}>{`${student_id}`.slice(-5)}</View>
                <View className={isHead ? 'head' : 'name'}>{name}</View>
                <View className={isHead ? 'head' : 'count'}>
                    {
                        isHead
                            ? star_count
                            : <Stars count={star_count} size={12}/>
                    }
                </View>
                {
                    isHead
                        ? <View>{checked}</View>
                        : <View
                            className='check-box'
                            onClick={this.handleChecked.bind(this, type)}
                        >
                            <AtIcon value='check' size={16} color={checked ? COLOR[0] : COLOR[1]}/>
                        </View>
                }
            </View>
        )
    }

    handleChecked = (key) => {
        this.props.toggleChecked(key)
    }
}

export default Star
