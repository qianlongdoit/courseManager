import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker } from '@tarojs/components'
import { AtForm } from 'taro-ui'
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
class Student extends Component {

    config = {
        navigationBarTitleText: '学生'
    }

    state = {
        selector: ['美国', '中国', '巴西', '日本'],
        selectorChecked: '美国',
        timeSel: '12:01',
        dateSel: '2018-04-22'
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
                    <Text>地区选择器</Text>
                    <View>
                        <Picker mode='selector' range={selector} onChange={this.onChange}>
                            <View className='picker'>
                                当前选择：{this.state.selectorChecked}
                            </View>
                        </Picker>
                    </View>
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
