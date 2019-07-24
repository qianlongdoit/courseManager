import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtModal,
    AtModalAction,
    AtModalContent,
    AtModalHeader,
    AtTabs,
    AtTabsPane,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {
    asyncGetStarCount,
    asyncGetTaskList,
    asyncAcceptTask,
    asyncGetRewardList,
    asyncExchangeReward,
    selectReward,
} from '../../actions/student'

import UserInfo from '../../components/student-stars/index'
import DailyTask from '../../components/student-daily-task/index'
import RewardList from '../../components/student-reward-list/index'
import './index.less'

const tabList = [
    {title: '我'},
    {title: '每日任务'},
    {title: '兑换奖品'}
];

@connect(({user, student}) => ({
    user,
    student,
}), (dispatch) => ({
    getStarCount(data) {
        dispatch(asyncGetStarCount(data))
    },
    asyncGetTaskList(data) {
        dispatch(asyncGetTaskList(data))
    },
    asyncAcceptTask(data) {
        dispatch(asyncAcceptTask(data))
    },
    asyncGetRewardList(data) {
        dispatch(asyncGetRewardList(data))
    },
    asyncExchangeReward(data) {
        dispatch(asyncExchangeReward(data))
    },
    selectReward(data) {
        dispatch(selectReward(data))
    },
}))
class Student extends Component {
    config = {
        navigationBarTitleText: '学生',
    }

    state = {
        current: 2,
        showModal: false,
    }

    componentDidShow = () => {
        const {
            user: {info},
            getStarCount,
            asyncGetTaskList,
            asyncGetRewardList,
        } = this.props;
        const data = {
            token: info.token,
            student_id: info.user_id
        };
        getStarCount(data);
        asyncGetTaskList(data);
        // asyncGetRewardList({token: info.token});
    }

    render() {
        const {current, showModal} = this.state;
        const {student} = this.props;
        const {
            studentStars,
            taskList = [],
            selectItem = {},
            rewardList = [],
        } = student;

        return (
            <View>
                <AtTabs current={current} tabList={tabList} onClick={this.handleChangeTab}>
                    <AtTabsPane current={current} index={0}>
                        <UserInfo
                            title={'个人信息：'}
                            studentStars={studentStars}
                        />
                    </AtTabsPane>
                    <AtTabsPane current={current} index={1}>
                        <DailyTask
                            task={taskList}
                            acceptTask={this.acceptTask}
                        />
                    </AtTabsPane>
                    <AtTabsPane current={current} index={2}>
                        <RewardList
                            {...student}
                            exchangeReward={this.exchangeReward}
                            handleRewardClick={this.handleRewardClick}
                        />
                    </AtTabsPane>
                </AtTabs>

                <AtModal
                    className='my-modal'
                    isOpened={showModal}
                    onClose={this.handleClose}
                >
                    <AtModalHeader>标题</AtModalHeader>
                    <AtModalContent>
                        <View>
                            确认花费
                            <Text className='count'>{selectItem.cost}</Text>
                            星兑换奖品
                            <Text className='item'>{selectItem.name}</Text>
                            吗？
                        </View>
                    </AtModalContent>
                    <AtModalAction>
                        <Button
                            onClick={this.handleCancel}
                        >取消</Button>
                        <Button
                            onClick={this.handleConfirm}
                        >兑换</Button>
                    </AtModalAction>
                </AtModal>
            </View>
        )
    }

    handleChangeTab = value => this.setState({current: value})

    acceptTask = () => {
        const {user: {info}, asyncAcceptTask} = this.props;
        const data = {
            token: info.token,
            student_id: info.user_id
        };

        return (task_id) => asyncAcceptTask({...data, task_id});
    }

    exchangeReward = () => {
        const {user: {info}, asyncExchangeReward} = this.props;
        const data = {
            token: info.token,
            student_id: info.user_id
        };
    }

    toggle = show => {
        show = typeof show === 'boolean' ? show : !this.state.showModal;
        this.setState({showModal: show});
    }

    handleRewardClick = (value, e) => {
        console.log(value, '0------');
        this.props.selectReward(value);
        this.toggle();
    }

    handleClose = e => {
        this.toggle();
    }
    handleCancel = e => {
        this.toggle();
    }
    handleConfirm = e => {
        this.toggle();
    }
}

export default Student
