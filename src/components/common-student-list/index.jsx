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
            index,
            item = {},
            // toggleChecked
        } = this.props;
        const {student_id, name, star_count, checked} = item;

        return (
            <View className='student-list'>
                <View className={!index ? 'head' : 'id'}>{student_id}</View>
                <View className={!index ? 'head' : 'name'}>{name}</View>
                <View className={!index ? 'head' : 'count'}>
                    {
                        !index
                            ? star_count
                            : <Stars count={star_count} size={12}/>
                    }
                </View>
                {
                    !index
                        ? <View>{checked}</View>
                        : <View
                            className='check-box'
                            onClick={this.handleChecked.bind(this, index)}
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
