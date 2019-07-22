import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtTabs,
    AtTabsPane,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {add, minus, asyncAdd} from '../../actions/counter'

import UserInfo from '../../components/student-stars/index'
import DailyTask from '../../components/student-daily-task/index'
import RewardList from '../../components/student-reward-list/index'
import './index.less'

const tabList = [
    {title: '我'},
    {title: '每日任务'},
    {title: '兑换奖品'}
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
    // constructor (props) {
    //     super(props);
    //     options.addGlobalClass = true;
    // }

    config = {
        navigationBarTitleText: '学生',
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
            <AtTabs current={current} tabList={tabList} onClick={this.handleChangeTab}>
                <AtTabsPane current={current} index={0}>
                    <UserInfo />
                </AtTabsPane>
                <AtTabsPane current={current} index={1}>
                    <DailyTask />
                </AtTabsPane>
                <AtTabsPane current={current} index={2}>
                    <RewardList />
                </AtTabsPane>
            </AtTabs>
        )
    }

    handleChangeTab = value => this.setState({current: value})
}

export default Student
