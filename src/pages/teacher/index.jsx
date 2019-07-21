import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker } from '@tarojs/components'
import {
    AtTabs,
    AtTabsPane,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {add, minus, asyncAdd} from '../../actions/counter'

import './index.less'

const tabList = [
    {title: '查看规则'},
    {title: '任务管理'},
    {title: '学生评分'},
    {title: '学生信息'},
];


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
        navigationBarTitleText: '老师'
    }

    state = {

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
            <View className='index'>
                <AtTabs current={current} tabList={tabList} onClick={this.handleChangeTab}>
                    <AtTabsPane current={current} index={0}>
                        aaa
                    </AtTabsPane>
                    <AtTabsPane current={current} index={1}>
                        bbb
                    </AtTabsPane>
                    <AtTabsPane current={current} index={2}>
                        ccc
                    </AtTabsPane>
                    <AtTabsPane current={current} index={3}>
                        ddd
                    </AtTabsPane>
                </AtTabs>
            </View>
        )
    }

    handleChangeTab = value => this.setState({current: value})
}

export default Student
