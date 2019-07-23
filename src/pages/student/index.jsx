import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtTabs,
    AtTabsPane,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {asyncGetStarCount} from '../../actions/counter'

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
    // add() {
    //     dispatch(add())
    // },
    // dec() {
    //     dispatch(minus())
    // },
    getStarCount(data) {
        dispatch(asyncGetStarCount(data))
    }
}))
class Student extends Component {

    config = {
        navigationBarTitleText: '学生',
    }

    state = {
        current: 0,
    }

    componentDidShow() {
        const {getStarCount} = this.props;
        getStarCount({});
    }

    render() {
        const {current} = this.state;
        const {counter} = this.props;
        const {studentStars} = counter;

        return (
            <AtTabs current={current} tabList={tabList} onClick={this.handleChangeTab}>
                <AtTabsPane current={current} index={0}>
                    <UserInfo
                        title={'个人信息：'}
                        studentStars={studentStars}
                    />
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
